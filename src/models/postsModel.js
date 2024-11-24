import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// função assíncrona que busca todos os posts do banco de dados.
export async function getTodosPosts() {
    const db = conexao.db("imersao-backend-alura");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
};

// função assíncrona que inclui novo post no banco de dados.
export async function criarPost(novopost) {
    const db = conexao.db("imersao-backend-alura");
    const colecao = db.collection("posts");
    return colecao.insertOne(novopost);
}

// função assíncrona que inclui novo post no banco de dados.
export async function atualizarPost(id, post) {
    const db = conexao.db("imersao-backend-alura");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:post});
}