import {getTodosPosts, getPost, criarPost, atualizarPost} from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js"
import fs from "fs";

//controlador da chamada da função listar todos os posts e retorna o resultado.
export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
};

//controlador da chamada da função listar um post por id e retorna o resultado.
export async function listarPost(req, res) {
    const id = req.params.id;  //id obtido dos parametros
    const post = await getPost(id);
    res.status(200).json(post);
};
getPost

//controlador da chamada da função criarPost sem enviar a imagem e retorna o resultado. (A)
export async function novoPost(req, res) {
    const novo_post = req.body;
    console.log("Dados: ", novo_post);
    try {
        const post_criado = await criarPost(novo_post);
        res.status(200).json(post_criado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição."});
    };
};

//controlador da chamada da função que insere imagem no banco de dados e renomeia de acordo com um id (B)
export async function uploadImagem(req, res) {
    try {
        const id = req.params.id;
        const imagem_atualizada = `uploads/${id}.png`;
        fs.renameSync(req.file.path, imagem_atualizada);
        res.status(200).json(imagem_atualizada);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição."});
    };
};

//controlador da chamada da função atualizaNovoPost que gera descrição da imagem por ia e retorna o resultado. (C)
export async function atualizaNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    console.log("Dados: ", postAtualizado);
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        const postAtualizado = {
            descricao: descricao,
            alt: descricao,
        }
        const post_atualizado = await atualizarPost(id, post);
        res.status(200).json(post_atualizado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição."});
    };
};

//controlador da chamada da função criarPost com a imagem, e adiciona descrição por ia e retorna o resultado. (A + B + C)
export async function novoPostComImagem(req, res) {
    try {
        const imageBuffer = fs.readFileSync(req.file.path)
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        const novo_post = {
            descricao: descricao,
            alt: descricao,
        }
        const post_criado = await criarPost(novo_post);
        const imagem_atualizada = `uploads/${post_criado.insertedId}.png`;
        fs.renameSync(req.file.path, imagem_atualizada);
        res.status(200).json(post_criado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição."});
    };
};