import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// busca e exibe todos os dados do banco de dados
export async function getTodosPosts() {
    const db = conexao.db("imersao-backend-alura");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
};

// busca e exibe um dado expecífico do banco de dados
export async function getPost(id) {
    const db = conexao.db("imersao-backend-alura");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.find({ _id: new ObjectId(objID) }).toArray();
};

// insere um novo item no banco de dados
export async function criarPost(novopost) {
    const db = conexao.db("imersao-backend-alura");
    const colecao = db.collection("posts");
    return colecao.insertOne(novopost);
}

// atualiza os campos de um item do banco de dados
export async function atualizarPost(id, post) {
    const db = conexao.db("imersao-backend-alura");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:post});
}