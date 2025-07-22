
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("networkingDB");
    const empresarios = db.collection("empresarios");

    const exemploEmpresarios = [
      {
        nome: "Ana Carolina Lima",
        email: "ana.lima@techlima.com",
        telefone: "+55 11 91234-5678",
        empresa: {
          nome: "TechLima Solutions",
          setor: "Tecnologia",
          cargo: "CEO",
          localizacao: "São Paulo, SP"
        },
        interesses: ["startups", "investimentos", "tecnologia"],
        redes_sociais: {
          linkedin: "https://linkedin.com/in/anacarolinalima",
          instagram: "@techlima"
        },
        eventos_participados: [
          {
            nome: "Web Summit Rio",
            data: "2025-05-10",
            local: "Rio de Janeiro"
          }
        ],
        conexoes: [],
        data_cadastro: new Date()
      },
      {
        nome: "Carlos Mendes",
        email: "carlos.mendes@inovatech.com",
        telefone: "+55 31 99876-5432",
        empresa: {
          nome: "InovaTech",
          setor: "Inovação",
          cargo: "Diretor de Inovação",
          localizacao: "Belo Horizonte, MG"
        },
        interesses: ["parcerias", "mentorias", "tecnologia"],
        redes_sociais: {
          linkedin: "https://linkedin.com/in/carlosmendes"
        },
        eventos_participados: [],
        conexoes: [],
        data_cadastro: new Date()
      }
    ];

    const result = await empresarios.insertMany(exemploEmpresarios);
    console.log(`${result.insertedCount} documentos inseridos com sucesso.`);
  } catch (err) {
    console.error("Erro ao conectar ou inserir:", err);
  } finally {
    await client.close();
  }
}

run();
