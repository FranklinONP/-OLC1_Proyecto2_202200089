%{
// codigo de JS si fuese necesario
const Tipo = require('./simbolo/Tipo')
const Nativo = require('./expresiones/Nativo')
const Aritmeticas = require('./expresiones/Aritmeticas')
const AccesoVar = require('./expresiones/AccesoVar')

const Print = require('./instrucciones/Print')
const Declaracion = require('./instrucciones/Declaracion')
const AsignacionVar = require('./instrucciones/AsignacionVar')
%}

// analizador lexico

%lex
%options case-insensitive

%%
\/\*[\s\S]*?\*\/        {}   /* Capturar comentarios multilinea */
\/\/.*(?:\r?\n|$)       {}   /* Capturar comentarios de línea */




//palabras reservadas
"imprimir"              return 'IMPRIMIR'
"int"                   return 'INT'
"double"                return 'DOUBLE'
"string"                return 'STRING'

// simbolos del sistema
";"                     return "PUNTOCOMA"
"+"                     return "MAS"
"-"                     return "MENOS"
"("                     return "PAR1"
")"                     return "PAR2"
"="                     return "IGUAL"
[0-9]+"."[0-9]+         return "DECIMAL"
[0-9]+                  return "ENTERO"
[a-z][a-z0-9_]*         return "ID"
[\"][^\"]*[\"]          {yytext=yytext.substr(1,yyleng-2); return 'CADENA'}

//blancos
[\ \r\t\f\t]+           {}
[\ \n]                  {}

// simbolo de fin de cadena
<<EOF>>                 return "EOF"


%{
    // CODIGO JS SI FUESE NECESARIO
%}

/lex

//precedencias
%left 'MAS' 'MENOS'
%right 'UMENOS'

// simbolo inicial
%start INICIO

%%

INICIO : INSTRUCCIONES EOF                  {return $1;}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION   {$1.push($2); $$=$1;}
              | INSTRUCCION                 {$$=[$1];}
;

INSTRUCCION : IMPRESION PUNTOCOMA            {$$=$1;}
            | DECLARACION PUNTOCOMA          {$$=$1;}
            | ASIGNACION PUNTOCOMA           {$$=$1;}
;

IMPRESION : IMPRIMIR PAR1 EXPRESION PAR2    {$$= new Print.default($3, @1.first_line, @1.first_column);}
;

DECLARACION : TIPOS ID IGUAL EXPRESION      {$$ = new Declaracion.default($1, @1.first_line, @1.first_column, $2, $4);}
;

ASIGNACION : ID IGUAL EXPRESION             {$$ = new AsignacionVar.default($1, $3, @1.first_line, @1.first_column);}
;

EXPRESION : EXPRESION MAS EXPRESION          {$$ = new Aritmeticas.default(Aritmeticas.Operadores.SUMA, @1.first_line, @1.first_column, $1, $3);}
          | EXPRESION MENOS EXPRESION        {$$ = new Aritmeticas.default(Aritmeticas.Operadores.RESTA, @1.first_line, @1.first_column, $1, $3);}
          | PAR1 EXPRESION PAR2              {$$ = $2;}
          | MENOS EXPRESION %prec UMENOS     {$$ = new Aritmeticas.default(Aritmeticas.Operadores.NEG, @1.first_line, @1.first_column, $2);}
          | ENTERO                           {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO), $1, @1.first_line, @1.first_column );}
          | DECIMAL                          {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL), $1, @1.first_line, @1.first_column );}
          | CADENA                           {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.CADENA), $1, @1.first_line, @1.first_column );}
          | ID                               {$$ = new AccesoVar.default($1, @1.first_line, @1.first_column);}      
;

TIPOS : INT             {$$ = new Tipo.default(Tipo.tipoDato.ENTERO);}
      | DOUBLE          {$$ = new Tipo.default(Tipo.tipoDato.DECIMAL);}
      | STRING          {$$ = new Tipo.default(Tipo.tipoDato.CADENA);}
;