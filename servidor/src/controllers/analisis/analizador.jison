%{
// codigo de JS si fuese necesario
const Tipo = require('./simbolo/Tipo')
const Nativo = require('./expresiones/Nativo')
const Aritmeticas = require('./expresiones/Aritmeticas')
const AccesoVar = require('./expresiones/AccesoVar')
const Errores = require('./excepciones/Errores')  

const Print = require('./instrucciones/Print')
const Println = require('./instrucciones/Println')
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
"cout"                  return 'COUT'
"int"                   return 'INT'
"double"                return 'DOUBLE'
"string"                return 'STRING'
"std"                   return 'STD'

// simbolos del sistema
"<<"                    return "APERTURA_COUT"
"endl"                  return "ENDL"
":"                     return "DOSPUNTOS"
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

// Errores Lexicos
.   {console.log("Se encontro un error lexico: "+ yytext)} // Captura cualquier otro carácter no reconocido

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

INICIO : instrucciones EOF                  {return $1;}
;

instrucciones : instrucciones instruccion   {$1.push($2); $$=$1;}
              | instruccion                 {$$=[$1];}
;

instruccion : impresion             {$$=$1;}
            | declaracion          {$$=$1;}
            | asignacion          {$$=$1;}
;

impresion :   COUT APERTURA_COUT expresion PUNTOCOMA         {$$= new Print.default($3, @1.first_line, @1.first_column);}
            | COUT APERTURA_COUT expresion ENDL PUNTOCOMA    {$$= new Println.default($3, @1.first_line, @1.first_column);}
;

declaracion : tipos ID IGUAL expresion PUNTOCOMA      {$$ = new Declaracion.default($1, @1.first_line, @1.first_column, $2, $4);}
;

asignacion : ID IGUAL expresion PUNTOCOMA            {$$ = new AsignacionVar.default($1, $3, @1.first_line, @1.first_column);}
;

expresion : expresion MAS expresion          {$$ = new Aritmeticas.default(Aritmeticas.Operadores.SUMA, @1.first_line, @1.first_column, $1, $3);}
          | expresion MENOS expresion        {$$ = new Aritmeticas.default(Aritmeticas.Operadores.RESTA, @1.first_line, @1.first_column, $1, $3);}
          | MENOS expresion %prec UMENOS     {$$ = new Aritmeticas.default(Aritmeticas.Operadores.NEG, @1.first_line, @1.first_column, $2);}
          | ENTERO                           {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO), $1, @1.first_line, @1.first_column );}
          | DECIMAL                          {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL), $1, @1.first_line, @1.first_column );}
          | CADENA                           {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.CADENA), $1, @1.first_line, @1.first_column );}
          | ID                               {$$ = new AccesoVar.default($1, @1.first_line, @1.first_column);}      
;

tipos : INT                                     {$$ = new Tipo.default(Tipo.tipoDato.ENTERO);}
      | DOUBLE                                  {$$ = new Tipo.default(Tipo.tipoDato.DECIMAL);}
      | STD DOSPUNTOS DOSPUNTOS STRING          {$$ = new Tipo.default(Tipo.tipoDato.CADENA);}
;