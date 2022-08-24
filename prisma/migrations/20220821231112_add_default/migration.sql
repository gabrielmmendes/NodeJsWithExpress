-- CreateTable
CREATE TABLE "user" (
    "codigo" SERIAL NOT NULL,
    "data_nascimento" TIMESTAMP(6),
    "data_vinculo" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR(255),
    "estado" VARCHAR(255),
    "municipio" VARCHAR(255),
    "nome_completo" VARCHAR(255),
    "nome_social" VARCHAR(255),
    "numero_acessos_curso" INTEGER DEFAULT 0,
    "sexo" VARCHAR(255),
    "situacao_curso" VARCHAR(255),

    CONSTRAINT "user_pkey" PRIMARY KEY ("codigo")
);
