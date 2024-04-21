%{
// codigo de JS si fuese necesario de Franklin
const Tipo = require('./simbolo/Tipo')
const Nativo = require('./expresiones/Nativo')
const Aritmeticas = require('./expresiones/Aritmeticas')
const AccesoVar = require('./expresiones/AccesoVar')
const Errores = require('./excepciones/Errores')  

const Print = require('./instrucciones/Print')
const Println = require('./instrucciones/Println')
const Declaracion = require('./instrucciones/Declaracion')
const AsignacionVar = require('./instrucciones/AsignacionVar')
//Arreglos
const AccesoArreglo = require('./expresiones/AccesoArreglo')
const declaracionArreglo = require('./instrucciones/declaracionArreglo')
const AsignacionArreglo = require('./instrucciones/AsignacionArreglo')

const declaracionMatriz = require('./instrucciones/declaracionMatriz')
const AccesoMatriz = require('./expresiones/AccesoMatriz')
const AsignacionMatriz = require('./instrucciones/AsignacionMatriz')
//Funciones
const Relacionales = require('./expresiones/Relacionales')
const If = require('./instrucciones/If')
const ElseIf = require('./instrucciones/ElseIf')
const Else = require('./instrucciones/Else')
const While = require('./instrucciones/While')
const Break = require('./instrucciones/Break')
//switch
const Switch =require('./instrucciones/Switch')
const CCase =require('./instrucciones/CCase')
//Do While
const DoWhile=require('./instrucciones/DoWhile')
//For
const For=require('./instrucciones/For')
//Incremento y decremento
const IncrementoDecremento=require('./expresiones/IncrementoDecremento')
//TErnario
const Ternario=require('./instrucciones/Ternario')
//Logicos
const ExpLogicas=require('./expresiones/ExpLogicas')
//Tipos para casteos
const TiposCasteos=require('./simbolo/TiposCasteos')
//Clase Casteo
const Casteo=require('./expresiones/Casteos')
//Execute
const Execute =require('./instrucciones/Execute')
//Funciones
const Funcion =require('./instrucciones/Funcion')
const Metodo = require('./instrucciones/Metodo')
// LLamada
const Llamada =require('./instrucciones/Llamada')
//Verdadera clase de casteos
const Cast=require('./expresiones/Cast')
//Return
const Return=require('./instrucciones/Return')
%}

// analizador lexico

%lex
%options case-insensitive

%%
\/\*[\s\S]*?\*\/        {}   /* Capturar comentarios multilinea */
\/\/.*(?:\r?\n|$)       {}   /* Capturar comentarios de línea */
//blancos
[\ \r\t\f\t]+           {}
[\ \n]                  {}
//Caracter 
//["]\\\\[']|[']\\\"[']|[']\\\'[']|[']\\n[']|[']\\t[']|[']\\r[']|['].?["]	return 'CARACTER'
//palabras reservadas
"cout"                  return 'COUT'
"int"                   return 'INT'
"double"                return 'DOUBLE'
"string"                return 'STRING'
"std"                   return 'STD'
"Bool"                  return 'BOOL'
"char"                  return 'CHAR'
"new"                   return 'NEW'
//Funciones

"execute"               return 'EXECUTE'
"void"                  return 'VOID'
"return"                return 'RETURN'         

"tolower"               return 'TOLOWER'
"toupper"               return 'TOUPPER'
"round"                 return 'ROUND'
"length"                return 'LENGTH'
"typeof"                return 'TYPEOF'
"tostring"              return 'TOSTRING'
"c_str"                 return 'CSTR'
//Ciclicas
"true"                  return 'TRUE'
"false"                 return 'FALSE'  
"if"                    return 'IF'
"else"                  return 'ELSE' 
"switch"                return 'SWITCH'
"case"                  return 'CASE'
"default"               return 'DEFAULT'
"while"                 return 'WHILE'
"break"                 return 'BREAK'
"do"                    return 'DO'
"for"                   return 'FOR'
"++"                    return "INCREMENTO"
"--"                    return "DECREMENTO"
// simbolos del sistema
"{"                     return "LLAVE1"
"}"                     return "LLAVE2"
"!="                    return "DIFERENTE"
"!"                     return "NOT"      ///Not
"&&"                    return "AND"      ///And
"||"                    return "OR"       ///Or
"?"                     return "INTERROGACION"
"<<"                    return "APERTURA_COUT"
"<="                    return "MENORIGUAL"                 
"<"                     return "MENOR"
">="                    return "MAYORIGUAL"
">"                     return "MAYOR"
"=="                    return "IGUALIGUAL"
"="                     return "IGUAL"
"["                     return "CORCHETE1"
"]"                     return "CORCHETE2"
"endl"                  return "ENDL"
":"                     return "DOSPUNTOS"
"."                     return "PUNTO"
";"                     return "PUNTOCOMA"
","                     return "COMA"
"+"                     return "MAS"
"-"                     return "MENOS"
"*"                     return "POR"
"/"                     return "DIV"
"%"                     return "MOD"
//=======================================
"("                     return "PAR1"
")"                     return "PAR2"
[0-9]+"."[0-9]+         return "DECIMAL"
[0-9]+                  return "ENTERO"
[a-z][a-z0-9_]*         return "ID"
[']\\\\[']|[']\\\"[']|[']\\\'[']|[']\\n[']|[']\\t[']|[']\\r[']|['].?['] {yytext=yytext.substr(1, yyleng-2); return 'CARACTER'}
(\"(\\.|[^\\"])*\") {yytext=yytext.substr(1, yyleng-2); return 'CADENA';}




// Errores Lexicos
.    {console.log("Se encontro un error lexico: "+ yytext)} // Captura cualquier otro carácter no reconocido

// simbolo de fin de cadena
<<EOF>>                 return "EOF"


%{
    // CODIGO JS SI FUESE NECESARIO
  
%}

/lex

//precedencias
//%left 'IGUALIGUAL' 'DIFERENTE'
//%left 'MENOR' 'MENORIGUAL' 'MAYOR' 'MAYORIGUAL'
//%left 'MAS' 'MENOS'
//%left 'POR' 'DIV' 'MOD'
//%left  'arreglos' 'declaraciones'
//%right 'UMENOS'
//presedencia de los logico
//%left 'AND'
//%left 'OR'
//%right 'NOT'

%left 'INTERROGACION'
%left 'OR'
%left 'AND'
%left 'NOT'
%left 'MENOR' 'MENORIGUAL' 'MAYOR' 'MAYORIGUAL' 'IGUALIGUAL' 'DIFERENTE'
%left 'MAS' 'MENOS'
%left 'POR' 'DIV'
%left 'MOD'
%right 'UMENOS'
%left 'expresion' 'PUNTO'
%left 'CSTR'
%left 'ID' 'IGUAL'
%left 'PAR1' 


// simbolo inicial
%start INICIO

%%

INICIO : instrucciones EOF                  {return $1;}
;

instrucciones : instrucciones instruccion   {$1.push($2); $$=$1;}
              | instruccion                 {$$=[$1];}
;

instruccion : arreglos                      {$$=$1;}
            | impresion                     {$$=$1;}
            | declaracion                   {$$=$1;}
            | asignacion                    {$$=$1;}
            | if                            {$$=$1;}
            | while                         {$$=$1;}
            | break                         {$$=$1;}
            | switch                        {$$=$1;}
            | doWhile                       {$$=$1;}
            | for                           {$$=$1;}
            | Execute                      {$$=$1;}
            | Metodo                       {$$=$1;}
            | Llamada                      {$$=$1;}
            | return                      {$$=$1;}
            | Funcion                     {$$=$1;}
;
//Return
return: RETURN expresion PUNTOCOMA {$$=new Return.default( @1.first_line, @1.first_column,$2);}
      | RETURN PUNTOCOMA   {$$ = new Break.default(@1.first_line, @1.first_column);}
;
//Metodo
Metodo: VOID ID PAR1 pmetodo PAR2 LLAVE1 instrucciones LLAVE2 {$$=new Metodo.default(new Tipo.default(Tipo.tipoDato.VOID), $2, $4, $7, @1.first_line, @1.first_column);console.log("111");}
      | VOID ID PAR1 PAR2 LLAVE1 instrucciones LLAVE2 {$$=new Metodo.default(new Tipo.default(Tipo.tipoDato.VOID), $2, [], $6, @1.first_line, @1.first_column);console.log("222");}
;  
//Funcion
Funcion: tipos ID PAR1 pmetodo PAR2 LLAVE1 instrucciones LLAVE2 {$$=new Funcion.default($1, $2, $4, $7, @1.first_line, @1.first_column);console.log("111");}
      | tipos ID PAR1 PAR2 LLAVE1 instrucciones LLAVE2 {$$=new Funcion.default($1, $2, [], $6, @1.first_line, @1.first_column);console.log("222");}
;
pmetodo:pmetodo COMA tipos ID { $1.push({tipo:$3, id:[$4]}); $$=$1;} 
       | tipos ID {$$ = [{tipo:$1, id:[$2]}];}
;
//Execute
Execute: EXECUTE ID PAR1 pllamada PAR2 PUNTOCOMA {$$=new Execute.default($2,$4, @1.first_line, @1.first_column);}
         |EXECUTE ID PAR1 PAR2 PUNTOCOMA            {$$=new Execute.default($2, [],@1.first_line, @1.first_column);}   
;
Llamada: ID PAR1 pllamada PAR2 PUNTOCOMA {$$=new Llamada.default($1, $3, @1.first_line, @1.first_column);}
        | ID PAR1 PAR2 PUNTOCOMA            {$$=new Llamada.default($1, [], @1.first_line, @1.first_column);}
;
//Parametros
pllamada : pllamada COMA expresion      {$1.push($3); $$=$1;} 
             | expresion                  {$$=[$1];}
;

//Ternario
ternario: expresion INTERROGACION expresion DOSPUNTOS expresion PUNTOCOMA {$$=new Ternario.default($1,$3,$5,@1.first_line, @1.first_column);}
;
//for
for : FOR PAR1 declaracion expresion PUNTOCOMA expresion PAR2 LLAVE1 instrucciones LLAVE2 {$$ = new For.default($3, $4, $6, $9, @1.first_line, @1.first_column); console.log("ent 1");}
        | FOR PAR1 asignacion  expresion PUNTOCOMA expresion PAR2 LLAVE1 instrucciones LLAVE2  {$$ = new For.default($3, $4, $6, $9, @1.first_line, @1.first_column); console.log("ent 2");}
;
//Do while
doWhile : DO LLAVE1 instrucciones LLAVE2 WHILE PAR1 expresion PAR2  {$$ = new DoWhile.default($7, $3, @1.first_line, @1.first_column);}
;
// Instruccion If 
// Else es el general para la instruccion if 
if      :   IF PAR1 expresion PAR2 LLAVE1 instrucciones LLAVE2
        {$$ = new Else.default($3, $6,null, @1.first_line, @1.first_column);}
        |   IF PAR1 expresion PAR2 LLAVE1 instrucciones LLAVE2 else
        {$$ = new Else.default($3, $6,$8, @1.first_line, @1.first_column);}
;

else    :   ELSE if
            { let else_sent = [];else_sent.push($2);$$ = else_sent;}
        | ELSE LLAVE1 instrucciones LLAVE2
            { $$ = $3;}
;


switch: SWITCH PAR1 expresion PAR2 LLAVE1 cases LLAVE2 {$$=new Switch.default($3,$6,@1.first_line, @1.first_column);}
;

cases: cases case   {$1.push($2); $$=$1;}
      | case        {let listCases2 = [];listCases2.push($1);$$ = listCases2;}
      | defaultCase {$$=  {type: 'Case', expresion:null, instrucciones: null, defaultCase: $1};}
;

case: CASE expresion DOSPUNTOS instrucciones 
        {$$ = {type: 'Case', expresion: $2, instrucciones: $4, defaultCase: null};}
    | CASE expresion DOSPUNTOS instrucciones defaultCase
        {$$ = {type: 'Case', expresion: $2, instrucciones: $4, defaultCase: $5};}
;

defaultCase: DEFAULT DOSPUNTOS instrucciones{$$=$3;}
;

//While
while : WHILE PAR1 expresion PAR2 LLAVE1 instrucciones LLAVE2      {$$ = new While.default($3, $6, @1.first_line, @1.first_column );}
;


break : BREAK PUNTOCOMA    {$$ = new Break.default(@1.first_line, @1.first_column);}
;


//Impresion
impresion :   COUT APERTURA_COUT expresion PUNTOCOMA         {$$= new Print.default($3, @1.first_line, @1.first_column);}
            | COUT APERTURA_COUT expresion APERTURA_COUT ENDL PUNTOCOMA    {$$= new Println.default($3, @1.first_line, @1.first_column);}
;
//Declaracion de arreglos
// 1D = tipo-fila-columna-id-valores-pos1
// 2D = tipo-fila-columna-id-valores-pos1-pos2
arreglos:   tipos ID CORCHETE1 CORCHETE2 IGUAL NEW tipos CORCHETE1 expresion CORCHETE2 PUNTOCOMA
                {$$=new declaracionArreglo.default($1, @1.first_line, @1.first_column,$2,null,$9);}
          | tipos ID CORCHETE1 CORCHETE2 CORCHETE1 CORCHETE2 IGUAL NEW tipos CORCHETE1 ENTERO CORCHETE2 CORCHETE1 ENTERO CORCHETE2 PUNTOCOMA
                {$$=new declaracionMatriz.default($1,@1.first_line, @1.first_column,$2,null,$11,$14)} 
          // Mando la lista de valores
          | tipos ID CORCHETE1 CORCHETE2 IGUAL CORCHETE1 contenido CORCHETE2 PUNTOCOMA 
                {$$=new declaracionArreglo.default($1, @1.first_line, @1.first_column,$2,$7,null);console.log("Entro a Declaracion Arreglo");}
          // 1D para funcion SCTR
          | tipos CORCHETE1 CORCHETE2 ID  IGUAL expresion PUNTOCOMA
                {$$=new declaracionArreglo.default($1, @1.first_line, @1.first_column,$4,$6,null,true);}
          | tipos ID CORCHETE1 CORCHETE2 CORCHETE1 CORCHETE2 IGUAL CORCHETE1 contenido2 CORCHETE2 PUNTOCOMA 
                {$$=new declaracionMatriz.default($1, @1.first_line, @1.first_column,$2,$9,null);}
;
 contenido2: contenido2 COMA CORCHETE1 contenido CORCHETE2   {$1.push($4); $$=$1;}
          | CORCHETE1 contenido CORCHETE2{$$=[$2];}
          | expresion{$$=$1;}
;

contenido:  contenido COMA expresion {$1.push($3); $$=$1;}
           | expresion{$$=[$1];}
;
//===================================================================
//Declaracion General
declaracion : tipos declaracionesRecursivas PUNTOCOMA 
                  {$$= new Declaracion.default($1, @1.first_line, @1.first_column,$2,null);}
            //Con ternario
            |tipos declaracionesRecursivas IGUAL ternario 
                  {$$= new Declaracion.default($1, @1.first_line, @1.first_column,$2,$4);}
            |tipos declaracionesRecursivas IGUAL expresion PUNTOCOMA 
                  {$$= new Declaracion.default($1, @1.first_line, @1.first_column,$2,$4);console.log("Entro a la declaracion");}
;
// Recursividad para declarar
declaracionesRecursivas: declaracionesRecursivas COMA ID   {$1.push($3); $$=$1;}
                        | ID {$$=[$1];}
;
//Especifico o por default
cuerpoDeclaracion:      IGUAL expresion PUNTOCOMA  {$$=$2;}
                        | PUNTOCOMA               {$$=null;}
;
//Asignacion de variables
asignacion : ID IGUAL expresion PUNTOCOMA            {$$ = new AsignacionVar.default($1, $3, @1.first_line, @1.first_column);}
              //Asignacion a arreglos
              // 1 Dimension
              | ID CORCHETE1 expresion CORCHETE2 IGUAL expresion PUNTOCOMA
                                                     {$$ = new AsignacionArreglo.default($1,$3, $6,@1.first_line, @1.first_column);
                                                     console.log("Entro al {}{}{}{}");}
              // 2 Dimension
              | ID CORCHETE1 expresion CORCHETE2 CORCHETE1 expresion CORCHETE2 IGUAL expresion PUNTOCOMA
                                                     {$$ = new AsignacionMatriz.default($1,$3,$6,$9,@1.first_line, @1.first_column);}
              |  ID INCREMENTO PUNTOCOMA             {$$ = new IncrementoDecremento.default($1, "++", @1.first_line, @1.first_column );}
              | ID DECREMENTO PUNTOCOMA              {$$ = new IncrementoDecremento.default($1, "--", @1.first_line, @1.first_column );}
          ;

expresion : expresion MAS expresion          {$$ = new Aritmeticas.default(Aritmeticas.Operadores.SUMA, @1.first_line, @1.first_column, $1, $3);}
          | expresion MENOS expresion        {$$ = new Aritmeticas.default(Aritmeticas.Operadores.RESTA, @1.first_line, @1.first_column, $1, $3);}
          | MENOS expresion %prec UMENOS     {$$ = new Aritmeticas.default(Aritmeticas.Operadores.NEG, @1.first_line, @1.first_column, $2);}
          | expresion POR expresion          {$$ = new Aritmeticas.default(Aritmeticas.Operadores.MULTIPLICACION, @1.first_line, @1.first_column, $1, $3);}
          | expresion DIV expresion          {$$ = new Aritmeticas.default(Aritmeticas.Operadores.DIVISION, @1.first_line, @1.first_column, $1, $3);}
          | expresion MOD expresion          {$$ = new Aritmeticas.default(Aritmeticas.Operadores.MODULO, @1.first_line, @1.first_column, $1, $3);}
          | ENTERO                           {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO), $1, @1.first_line, @1.first_column );}
          | DECIMAL                          {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL), $1, @1.first_line, @1.first_column );}
          | CARACTER
                  {
                  var text = $1.substr(0,$1.length);
                  text = text.replace(/\\n/g, "\n");
                  text = text.replace(/\\\\/g, "\\");
                  text = text.replace(/\\\"/g,"\"");
                  text = text.replace(/\\r/g, "\r");
                  text = text.replace(/\\t/g, "\t");
                  text = text.replace(/\\\'/g, "'");

                  $$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.CARACTER), text, @1.first_line, @1.first_column);
                  }
          | CADENA                           
                  {
                  var text = $1.substr(0,$1.length);
                  text = text.replace(/\\n/g, "\n");
                  text = text.replace(/\\\\/g, "\\");
                  text = text.replace(/\\\"/g,"\"");
                  text = text.replace(/\\r/g, "\r");
                  text = text.replace(/\\t/g, "\t");
                  text = text.replace(/\\\'/g, "'");
                  $$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.CADENA), text, @1.first_line, @1.first_column);
                  }
          | BOOL                             {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL),$1, @1.first_line, @1.first_column );}   
          //Comparadores
          | TRUE                             {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL), true, @1.first_line, @1.first_column ); }
          | FALSE                            {$$ = new Nativo.default(new Tipo.default(Tipo.tipoDato.BOOL), false, @1.first_line, @1.first_column ); }
          | PAR1 expresion PAR2              {$$ = $2;}
          | expresion MENOR expresion        {$$ = new Relacionales.default(Relacionales.Relacional.MENOR, $1, $3, @1.first_line, @1.first_column);}
          | expresion MENORIGUAL expresion   {$$ = new Relacionales.default(Relacionales.Relacional.MENORIGUAL, $1, $3, @1.first_line, @1.first_column);}
          | expresion MAYOR expresion        {$$ = new Relacionales.default(Relacionales.Relacional.MAYOR, $1, $3, @1.first_line, @1.first_column);}
          | expresion MAYORIGUAL expresion   {$$ = new Relacionales.default(Relacionales.Relacional.MAYORIGUAL, $1, $3, @1.first_line, @1.first_column);}
          | expresion IGUALIGUAL expresion   {$$ = new Relacionales.default(Relacionales.Relacional.IGUALIGUAL, $1, $3, @1.first_line, @1.first_column);}
          | expresion DIFERENTE expresion     {$$ = new Relacionales.default(Relacionales.Relacional.DIFERENTE, $1, $3, @1.first_line, @1.first_column);}
           //LLamada a funciones
          | Llamada {$$=$1;console.log("HOla")}//{$$=new Llamada.default($1, $3, @1.first_line, @1.first_column);}
          //Para mientras no necesita punto y coma
          | ID INCREMENTO                            {$$ = new IncrementoDecremento.default($1, "++", @1.first_line, @1.first_column );}
          | ID DECREMENTO                            {$$ = new IncrementoDecremento.default($1, "--", @1.first_line, @1.first_column );}
        // Logicas
          |NOT expresion {$$ = new ExpLogicas.default(ExpLogicas.Logico.NOT,@1.first_line, @1.first_column,$2,null);}
          | expresion AND expresion  {$$ = new ExpLogicas.default(ExpLogicas.Logico.AND,@1.first_line, @1.first_column,$1,$3);}
          | expresion OR expresion   {$$ = new ExpLogicas.default(ExpLogicas.Logico.OR, @1.first_line, @1.first_column,$1,$3);}
          //| ternario {$$=$1;}
          //Las Funciones
          | TOLOWER PAR1 expresion PAR2 {$$=new Casteo.default(new TiposCasteos.default(TiposCasteos.tipoDatoCasteo.TOLOWER),$3,@1.first_line, @1.first_column);}     
          | TOUPPER PAR1 expresion PAR2 {$$=new Casteo.default(new TiposCasteos.default(TiposCasteos.tipoDatoCasteo.TOUPPER),$3,@1.first_line, @1.first_column);}
          | ROUND PAR1 expresion PAR2 {$$=new Casteo.default(new TiposCasteos.default(TiposCasteos.tipoDatoCasteo.ROUND),$3,@1.first_line, @1.first_column);}
          | expresion PUNTO LENGTH PAR1 PAR2{$$=new Casteo.default(new TiposCasteos.default(TiposCasteos.tipoDatoCasteo.LENGTH),$1,@1.first_line, @1.first_column);}
          | TYPEOF PAR1 expresion PAR2 {$$=new Casteo.default(new TiposCasteos.default(TiposCasteos.tipoDatoCasteo.TYPEOF),$3,@1.first_line, @1.first_column);}
          | STD DOSPUNTOS DOSPUNTOS TOSTRING PAR1 expresion PAR2 {$$=new Casteo.default(new TiposCasteos.default(TiposCasteos.tipoDatoCasteo.TOSTRING),$6,@1.first_line, @1.first_column);console.log("<===>");}
          | expresion PUNTO CSTR PAR1 PAR2 
            {$$=new Casteo.default(new TiposCasteos.default(TiposCasteos.tipoDatoCasteo.CSTR),$1,@1.first_line, @1.first_column);console.log("Entro al CSTR");}
          | ID                               {$$ = new AccesoVar.default($1, @1.first_line, @1.first_column);console.log("Entro al acceso");}
          | ID CORCHETE1 expresion CORCHETE2 {$$ = new AccesoArreglo.default($1, @1.first_line, @1.first_column,$3);}
          | ID CORCHETE1 expresion CORCHETE2 CORCHETE1 expresion CORCHETE2 {$$ = new AccesoMatriz.default($1, @1.first_line, @1.first_column,$3,$6);}
          //Para casteos
          | PAR1 INT PAR2 expresion {$$=new Cast.default(new Tipo.default(Tipo.tipoDato.ENTERO),$3,@1.first_line, @1.first_column);console.log("dd")}
          | PAR1 DOUBLE PAR2 expresion {$$=new Cast.default(new Tipo.default(Tipo.tipoDato.DECIMAL),$3,@1.first_line, @1.first_column);}
          | PAR1 STRING PAR2 expresion {$$=new Cast.default(new Tipo.default(Tipo.tipoDato.CADENA),$3,@1.first_line, @1.first_column);} 
          | PAR1 CHAR PAR2 expresion {$$=new Cast.default(new Tipo.default(Tipo.tipoDato.CARACTER),$3,@1.first_line, @1.first_column);}
         
             
;       


tiposCasteos: TOLOWER                           {$$=new TiposCasteos.default(TiposCasteos.Casteos.TOLOWER);}
            | TOUPPER                           {$$=new TiposCasteos.default(TiposCasteos.Casteos.TOUPPER);}
            | ROUND                             {$$=new TiposCasteos.default(TiposCasteos.Casteos.ROUND);}
            | LENGTH                            {$$=new TiposCasteos.default(TiposCasteos.Casteos.LENGTH);}
            | TYPEOF                            {$$=new TiposCasteos.default(TiposCasteos.Casteos.TYPEOF);}
            | STD DOSPUNTOS DOSPUNTOS STRING    {$$=new TiposCasteos.default(TiposCasteos.Casteos.STRING);}
            | PUNTO CSTR                        {$$=new TiposCasteos.default(TiposCasteos.Casteos.CSTR);}
;

tipos : INT                                     {$$ = new Tipo.default(Tipo.tipoDato.ENTERO);}
      | DOUBLE                                  {$$ = new Tipo.default(Tipo.tipoDato.DECIMAL);}
      | STD DOSPUNTOS DOSPUNTOS STRING          {$$ = new Tipo.default(Tipo.tipoDato.CADENA);}
      | BOOL                                    {$$ = new Tipo.default(Tipo.tipoDato.BOOL);}
      | CHAR                                    {$$ = new Tipo.default(Tipo.tipoDato.CARACTER);}
      //| VOID                                    {$$ = new Tipo.default(Tipo.tipoDato.VOID);}
;

