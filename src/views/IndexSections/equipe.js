import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

export default function Habilidades() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="section fundo-um" id="equipe">
      <Container>
        <Row style={{ color: "#fffda8" }} className="cv">
          <h2 style={{ color: "#fffda8" }} data-aos="fade-up" className="title text-center">
            Modalidades
          </h2>
          <p data-aos="fade-up" style={{ fontSize: 22 }}>Conheça nossas modalidades:</p>
          <Col md="12 mt-3 text-center">
            <Row>
              <div class="cv-item col-md-4 mt-3" style={{ color: "#fffda8" }} data-aos="fade-up">
                <h4 className="" style={{ color: "#fffda8" }}>Ballet de formação - Todas as idades</h4>
                {/* 
              <img
                alt="Ballet clássico"
                height={400}
                width={400}
                className="img-fluid"
                src={require("assets/img/formacao.jpeg")}
              />
              */}
                <p className="mt-3">
                  Nossas aulas de Ballet de Formação são projetadas para construir uma base sólida nas técnicas clássicas.
                  Ideal para crianças e adolescentes que desejam explorar a elegância e a disciplina do ballet.
                </p>
              </div>
              <div class="cv-item col-md-4 mt-3" style={{ color: "#fffda8" }} data-aos="fade-up">
                <h4 className="" style={{ color: "#fffda8" }}>Jazz Dance - A partir dos 6 anos</h4>
                {/*   <img
                alt="Jazz Dance"
                height={400}
                width={400}
                className="img-fluid"
                src={require("assets/img/jazz.jpeg")}
              />      */}
                <p className="mt-3">
                  A energia e a vibração do Jazz Dance são exploradas em nossas aulas dinâmicas. Indicado para adolescentes
                  e adultos que buscam liberdade de movimento e autoexpressão.
                </p>
              </div>
              <div class="cv-item col-md-4 mt-3" style={{ color: "#fffda8" }} data-aos="fade-up">
                <h4 className="" style={{ color: "#fffda8" }}>Ballet adulto - A partir 15 anos</h4>
                {/* <img
                alt="Jazz Dance"
                height={400}
                width={400}
                className="img-fluid"
                src={require("assets/img/adulto.jpeg")}
              />  */}
                <p className="mt-3">
                  Nunca é tarde para começar a dançar! O Ballet Adulto oferece uma experiência enriquecedora,
                  promovendo flexibilidade, postura e bem-estar físico e menta.
                </p>
              </div>
            </Row>
            <Row className="mt-5 mb-5">
              <div class="cv-item col-md-4 mt-3" style={{ color: "#fffda8" }} data-aos="fade-up">
                <h4 className="" style={{ color: "#fffda8" }}>Baby Class - A partir dos 3 anos</h4>
                {/*    <img
                alt="Baby Class"
                height={400}
                width={400}
                className="img-fluid"
                src={require("assets/img/baby.jpeg")}
              /> */}
                <p className="mt-3">
                  Para os nossos bailarinos(as) mais jovens, o Baby Class é uma introdução
                  lúdica ao mundo da dança. Focada no desenvolvimento motor e na expressão criativa.
                </p>
              </div>
         {/*
              <div class="cv-item col-md-4 mt-3" style={{ color: "#fffda8" }} data-aos="fade-up">
                <h4 className="" style={{ color: "#fffda8" }}>Psicomotricidade (Baby-Fraldinha) - A partir dos 1 ano e 8 meses</h4>
                {/*  <img
              <h4 className="" style={{ color: "#fffda8" }}>Psicomotricidade (Baby-Fraldinha)</h4>
              <img
                alt="Baby Fraldinha"
                height={400}
                width={400}
                className="img-fluid"
                src={require("assets/img/fraldinha.jpeg")}
              /> */}    {/*
                <p className="mt-3">
                  A Psicomotricidade é integrada às nossas aulas para promover o desenvolvimento físico, cognitivo e emocional. Adequada para desenvolver e preparar crianças apartir de 1 ano e 8 meses.
                </p>
              </div> */}
               <div class="cv-item col-md-4 mt-3" style={{ color: "#fffda8" }} data-aos="fade-up"></div>
              <div class="cv-item col-md-4 mt-3" style={{ color: "#fffda8" }} data-aos="fade-up">
                <h4 className="" style={{ color: "#fffda8" }}>Ballet infantil - A partir dos 6 anos</h4>
                {/*   <img
              <h4 className="" style={{ color: "#fffda8" }}>Ballet infantil</h4>
              <img
                alt="Jazz Dance"
                height={400}
                width={400}
                className="img-fluid"
                src={require("assets/img/infantil.jpeg")}
              />  */}

                <p className="mt-3">
                  O Ballet infantil é uma introdução encantadora à dança para os mais jovens, explorando movimentos delicados e promovendo desenvolvimento físico, coordenação motora e autoconfiança.
                  As aulas criam uma base sólida, nutrindo a criatividade e permitindo que as crianças descubram a magia da dança clássica.
                </p>
              </div>
            </Row>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col data-aos="fade-up" md="6 text-center">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet">

              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#fffda8" stroke="none">
                <path d="M3243 5105 c-120 -33 -237 -120 -294 -221 l-29 -50 -87 19 c-123 27
-401 29 -526 4 -496 -100 -857 -436 -932 -866 -18 -100 -21 -776 -5 -881 40
-254 197 -485 440 -650 62 -42 237 -130 259 -130 8 0 11 -38 11 -124 l0 -124
-27 -6 c-16 -2 -55 -8 -88 -11 -113 -12 -288 -66 -405 -125 -331 -166 -582
-458 -694 -806 -56 -172 -58 -198 -63 -656 l-5 -427 26 -26 25 -25 1711 0
1711 0 25 25 26 26 -5 427 c-5 458 -7 484 -63 656 -111 347 -363 640 -691 804
-121 62 -294 115 -408 127 -33 3 -72 9 -87 11 l-28 6 0 118 0 119 94 44 c294
140 493 347 581 608 42 122 47 196 43 619 -5 432 -7 454 -73 609 l-26 63 51
54 c172 182 170 470 -5 653 -120 126 -302 179 -462 136z m267 -186 c68 -36 99
-68 138 -143 21 -42 26 -65 26 -131 1 -86 -17 -141 -69 -209 l-26 -35 -102
103 c-109 110 -213 186 -333 243 l-74 35 30 44 c89 129 267 169 410 93z m-770
-213 c346 -53 645 -256 779 -531 58 -118 72 -179 78 -349 l6 -148 -114 6
c-435 27 -793 113 -952 230 -55 40 -72 108 -42 165 26 52 55 175 62 263 6 83
5 87 -20 112 -33 33 -79 34 -111 3 -18 -19 -24 -38 -29 -103 -8 -99 -45 -219
-94 -304 -51 -87 -208 -243 -298 -296 -132 -77 -254 -118 -449 -149 l-38 -6 5
188 c5 211 15 260 77 388 184 379 665 602 1140 531z m-206 -976 c189 -105 548
-182 949 -205 l117 -7 0 -169 c0 -199 -15 -290 -66 -398 -133 -285 -422 -481
-786 -535 -495 -74 -976 145 -1158 526 -53 111 -70 199 -70 363 l0 134 33 5
c208 30 326 65 462 134 111 57 228 145 297 222 l52 58 50 -45 c27 -24 81 -62
120 -83z m26 -1483 c136 0 214 5 258 15 l62 15 0 -153 c0 -196 0 -196 129
-205 51 -4 95 -9 98 -13 12 -11 -16 -247 -47 -397 -49 -236 -86 -352 -130
-402 -52 -58 -131 -103 -224 -127 -192 -49 -407 4 -514 125 -46 52 -86 175
-133 409 -30 148 -58 381 -46 392 3 4 47 9 98 13 129 9 129 9 129 205 l0 153
63 -15 c43 -10 121 -15 257 -15z m-684 -617 c19 -133 67 -343 103 -459 33
-104 77 -170 153 -229 208 -160 497 -186 743 -67 94 45 171 109 218 181 60 90
177 617 177 795 0 33 5 33 75 4 28 -11 32 -19 58 -133 16 -67 57 -229 93 -359
104 -385 104 -383 104 -824 l0 -379 -1040 0 -1040 0 0 379 c0 423 4 456 76
717 20 71 62 233 94 359 l58 230 48 17 49 16 8 -71 c4 -40 14 -119 23 -177z
m-345 5 c-15 -61 -54 -204 -84 -320 -86 -320 -87 -330 -87 -771 l0 -384 -201
0 -201 0 5 367 c4 327 7 378 25 453 55 231 162 422 326 586 84 83 238 200 244
185 1 -3 -11 -56 -27 -116z m2275 -69 c168 -168 272 -358 330 -603 13 -54 17
-143 21 -435 l5 -368 -200 0 -201 0 -4 422 c-4 482 6 406 -120 873 -36 132
-68 255 -72 273 l-7 34 78 -53 c44 -29 120 -93 170 -143z"/>
                <path d="M1945 3415 c-50 -49 -15 -135 55 -135 41 0 80 39 80 80 0 41 -39 80
-80 80 -19 0 -40 -9 -55 -25z"/>
                <path d="M2985 3415 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 15 -16 36
-25 55 -25 19 0 40 9 55 25 16 15 25 36 25 55 0 19 -9 40 -25 55 -15 16 -36
25 -55 25 -19 0 -40 -9 -55 -25z"/>
                <path d="M2265 2935 c-53 -52 -23 -115 78 -165 79 -39 163 -54 257 -47 204 16
339 128 255 212 -32 33 -75 32 -114 -1 -84 -70 -271 -72 -357 -3 -46 36 -86
38 -119 4z"/>
              </g>
            </svg>
            <div style={{ color: "#fffda8" }} className="text-center" data-aos="fade-up-right">
              <span className="nomeEquipe mt-5">Equipe de professores:</span>
              <p className="mt-2 textoSobre">
                Contamos com uma equipe de professores dedicados,
                comprometidos em nutrir o talento e o potencial de cada aluno. Com experiência e paixão, eles guiam nossos dançarinos em cada jornada de aprendizado.
              </p>
            </div>
          </Col>
          <Col data-aos="fade-up" md="6 text-center">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#fffda8" stroke="none">
                <path d="M505 4935 c-52 -51 -53 -50 314 -493 l339 -409 -193 -824 c-107 -453
-197 -834 -200 -846 -5 -21 -5 -21 -57 8 -64 35 -89 36 -124 6 l-27 -24 -17
-274 -16 -274 -56 -95 c-69 -117 -73 -131 -54 -168 17 -33 34 -42 75 -42 33 0
58 25 101 102 17 32 36 60 41 63 5 3 142 -71 306 -166 351 -203 354 -204 391
-187 41 20 56 59 39 100 -13 29 -53 55 -303 199 -159 92 -308 177 -331 190
l-43 24 1 60 c1 93 14 284 21 290 5 5 1122 -635 1142 -655 5 -5 -63 -56 -167
-125 l-175 -116 -168 -292 c-168 -293 -213 -354 -272 -375 l-30 -10 -4 141
c-4 162 -20 209 -93 282 -65 65 -125 89 -225 89 -73 0 -92 -4 -138 -27 -66
-35 -125 -95 -149 -152 -10 -25 -21 -45 -25 -45 -14 0 -57 61 -73 104 -25 65
-16 131 29 216 42 82 45 112 11 145 -54 55 -111 19 -171 -107 -37 -78 -39 -88
-39 -178 0 -86 3 -102 31 -160 38 -81 83 -133 151 -177 l53 -34 0 -189 0 -190
-55 0 c-46 0 -60 -4 -80 -25 -33 -32 -33 -78 0 -110 l24 -25 431 0 431 0 24
25 c33 32 33 78 0 110 -20 21 -34 25 -80 25 l-55 0 0 58 0 57 59 17 c64 19
144 74 188 129 15 20 100 160 187 312 l159 277 228 149 c183 120 230 155 235
177 11 44 -7 76 -63 109 -29 16 -52 33 -50 38 1 4 387 471 857 1038 768 926
855 1035 858 1069 2 29 -2 43 -19 59 -23 21 -73 28 -95 13 -7 -4 -237 -279
-513 -612 -276 -333 -506 -605 -511 -605 -7 0 -831 986 -1170 1400 l-57 70 93
395 c51 217 94 405 94 418 0 32 -43 72 -78 72 -64 0 -68 -9 -153 -370 -43
-184 -80 -341 -81 -349 -2 -7 -131 142 -288 330 -157 189 -295 354 -307 367
-30 30 -77 29 -108 -3z m1369 -1765 c317 -382 574 -700 572 -707 -3 -7 -141
-176 -308 -377 l-302 -365 -56 31 c-30 17 -58 34 -62 37 -4 4 -2 35 4 69 22
118 -22 253 -111 342 -152 152 -396 159 -549 16 l-32 -30 -43 23 c-24 13 -52
30 -62 37 -18 14 -12 45 170 819 104 443 193 804 196 803 4 -2 267 -316 583
-698z m-473 -1022 c50 -14 114 -69 139 -118 21 -42 37 -135 23 -143 -4 -3 -89
42 -188 99 -99 57 -184 105 -190 108 -16 6 17 34 60 50 49 18 106 20 156 4z
m-593 -1215 c37 -27 61 -63 68 -100 l7 -33 -57 0 c-47 0 -61 -4 -81 -25 -16
-15 -25 -36 -25 -55 0 -51 38 -80 105 -80 l55 0 0 -160 0 -160 -160 0 -160 0
0 254 c0 156 4 266 11 283 14 37 47 72 84 89 40 19 119 12 153 -13z"/>
                <path d="M1385 3415 c-50 -49 -15 -135 55 -135 41 0 80 39 80 80 0 41 -39 80
-80 80 -19 0 -40 -9 -55 -25z"/>
                <path d="M1573 3030 c-12 -5 -39 -32 -59 -60 -39 -55 -94 -92 -162 -110 -85
-22 -106 -81 -53 -149 52 -66 65 -101 67 -186 2 -73 5 -82 30 -103 30 -26 35
-26 142 5 60 17 64 17 125 0 106 -31 111 -31 141 -5 25 21 28 30 30 103 2 85
15 120 67 186 31 40 37 84 16 113 -7 9 -39 26 -72 37 -77 25 -123 58 -160 113
-17 26 -43 50 -59 56 -16 5 -29 10 -30 9 -1 0 -11 -4 -23 -9z m52 -230 c14
-16 67 -53 92 -64 1 -1 -9 -32 -22 -70 l-23 -69 -72 0 -72 0 -23 69 c-13 38
-23 69 -22 70 25 11 78 48 92 64 10 11 21 20 25 20 4 0 15 -9 25 -20z"/>
                <path d="M3625 4935 c-14 -13 -25 -33 -25 -45 0 -11 137 -603 305 -1316 168
-713 305 -1302 305 -1309 0 -19 -111 -79 -126 -69 -6 5 -33 26 -60 47 -110 84
-269 99 -399 38 -161 -75 -258 -256 -227 -423 6 -34 8 -65 4 -69 -4 -4 -32
-21 -62 -38 l-56 -30 -232 279 -232 280 -39 0 c-58 0 -95 -52 -75 -104 3 -9
102 -132 220 -273 117 -142 214 -260 214 -263 0 -3 -24 -19 -53 -35 -56 -33
-74 -65 -63 -109 5 -22 52 -57 235 -177 l227 -150 160 -276 c87 -152 172 -292
187 -312 44 -55 124 -110 188 -129 l59 -17 0 -57 0 -58 -55 0 c-46 0 -60 -4
-80 -25 -33 -32 -33 -78 0 -110 l24 -25 431 0 431 0 24 25 c33 32 33 78 0 110
-20 21 -34 25 -80 25 l-55 0 0 189 0 189 49 32 c68 43 117 100 155 179 28 60
31 75 31 162 0 92 -1 98 -43 182 -61 124 -114 156 -167 102 -34 -33 -31 -64
12 -147 44 -86 53 -150 28 -214 -16 -43 -59 -104 -73 -104 -4 0 -15 20 -25 45
-24 57 -82 117 -149 152 -46 24 -65 28 -138 28 -100 0 -159 -23 -225 -89 -74
-74 -89 -120 -93 -283 -2 -79 -7 -143 -11 -143 -4 0 -28 13 -54 30 -55 34 -63
46 -261 392 l-148 256 -175 117 c-96 64 -171 120 -167 125 9 8 75 47 609 355
132 76 305 176 384 222 79 46 146 81 149 78 7 -6 20 -196 21 -290 l1 -60 -331
-190 c-286 -164 -333 -194 -345 -222 -32 -74 41 -132 116 -93 14 7 157 89 318
182 161 93 296 166 301 163 5 -3 24 -31 41 -63 18 -31 42 -67 53 -80 25 -27
76 -29 108 -3 38 31 30 73 -36 186 l-58 100 -17 274 -17 274 -27 24 c-36 30
-59 29 -123 -7 l-53 -30 -7 28 c-3 15 -93 396 -199 846 l-192 820 339 408
c367 443 366 442 314 493 -31 32 -78 33 -108 3 -12 -13 -150 -178 -307 -367
-157 -189 -286 -337 -288 -330 -1 8 -38 165 -81 349 -66 276 -83 337 -101 352
-32 26 -76 23 -105 -7z m270 -2800 c22 -11 40 -24 40 -30 0 -13 -367 -225
-378 -218 -15 9 0 97 22 142 24 46 84 100 132 118 46 17 136 11 184 -12z m593
-1202 c14 -10 35 -32 46 -47 20 -26 21 -43 24 -297 l3 -269 -161 0 -160 0 0
160 0 160 55 0 c67 0 105 29 105 80 0 51 -38 80 -105 80 -60 0 -64 5 -44 57
14 37 47 72 84 89 40 19 119 12 153 -13z"/>
                <path d="M905 4855 c-50 -49 -15 -135 55 -135 41 0 80 39 80 80 0 41 -39 80
-80 80 -19 0 -40 -9 -55 -25z"/>
                <path d="M2153 4815 c-73 -31 -51 -145 28 -145 42 0 65 14 77 48 23 66 -40
124 -105 97z"/>
                <path d="M3945 4775 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 15 -16 36
-25 55 -25 19 0 40 9 55 25 16 15 25 36 25 55 0 19 -9 40 -25 55 -15 16 -36
25 -55 25 -19 0 -40 -9 -55 -25z"/>
                <path d="M3065 4695 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 15 -16 36
-25 55 -25 19 0 40 9 55 25 16 15 25 36 25 55 0 19 -9 40 -25 55 -15 16 -36
25 -55 25 -19 0 -40 -9 -55 -25z"/>
                <path d="M2533 4390 c-12 -5 -39 -32 -59 -60 -39 -55 -94 -92 -162 -110 -83
-21 -107 -83 -57 -142 51 -61 69 -108 71 -193 2 -73 5 -82 30 -103 30 -26 35
-26 142 5 60 17 64 17 125 0 106 -31 111 -31 142 -5 25 22 27 30 29 103 2 85
15 119 67 186 31 40 37 84 16 113 -7 9 -39 26 -72 37 -77 25 -123 58 -160 113
-17 26 -43 50 -59 56 -16 5 -29 10 -30 9 -1 0 -11 -4 -23 -9z m52 -230 c14
-16 67 -53 92 -64 1 -1 -9 -32 -22 -70 l-23 -69 -72 0 -72 0 -23 69 c-13 38
-23 69 -22 70 25 11 78 48 92 64 10 11 21 20 25 20 4 0 15 -9 25 -20z"/>
                <path d="M1785 4135 c-50 -49 -15 -135 55 -135 41 0 80 39 80 80 0 41 -39 80
-80 80 -19 0 -40 -9 -55 -25z"/>
                <path d="M2665 3335 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 15 -16 36
-25 55 -25 19 0 40 9 55 25 16 15 25 36 25 55 0 19 -9 40 -25 55 -15 16 -36
25 -55 25 -19 0 -40 -9 -55 -25z"/>
                <path d="M3573 3190 c-12 -5 -39 -32 -59 -60 -39 -55 -94 -92 -162 -110 -85
-22 -106 -81 -53 -149 52 -66 65 -101 67 -186 2 -73 5 -82 30 -103 30 -26 35
-26 142 5 60 17 64 17 125 0 106 -31 111 -31 141 -5 25 21 28 30 30 103 2 85
20 132 71 193 27 33 33 78 12 106 -7 9 -39 26 -72 37 -77 25 -123 58 -160 113
-17 26 -43 50 -59 56 -16 5 -29 10 -30 9 -1 0 -11 -4 -23 -9z m52 -230 c14
-16 67 -53 92 -64 1 -1 -9 -32 -22 -70 l-23 -69 -72 0 -72 0 -23 69 c-13 38
-23 69 -22 70 25 11 78 48 92 64 10 11 21 20 25 20 4 0 15 -9 25 -20z"/>
                <path d="M3145 2455 c-50 -49 -15 -135 55 -135 41 0 80 39 80 80 0 41 -39 80
-80 80 -19 0 -40 -9 -55 -25z"/>
              </g>
            </svg>
            <div style={{ color: "#fffda8" }} className="text-center" data-aos="fade-up-right">
              <span className="nomeEquipe mt-5">Eventos e Espetáculos:</span>
              <p className="mt-2 textoSobre">
                Ao longo do ano, preparamos apresentações encantadoras, oportunidades para nossos alunos brilharem no palco e compartilharem sua paixão com amigos e familiares.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
