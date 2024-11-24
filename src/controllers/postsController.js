import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js"
import fs from "fs";

//controlador da chamada da função listar todos os posts e retorna o resultado.
export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
};

//controlador da chamada da função criarPost dentro de um try e retorna o resultado.
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

//controlador da chamada da função uploadImagem dentro de um try e retorna o resultado.
export async function uploadImagem(req, res) {
    const novo_post = {
        descricao: "",
        imagemURL: req.file.originalname,
        alt: ""
    };
    console.log("Dados: ", novo_post);
    try {
        const post_criado = await criarPost(novo_post);
        const imagem_atualizada = `uploads/${post_criado.insertedId}.png`;
        fs.renameSync(req.file.path, imagem_atualizada);
        res.status(200).json(post_criado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição."});
    };
};

export async function atualizaNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    console.log("Dados: ", postAtualizado);
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        const postAtualizado = {
            imagemURL: urlImagem,
            descricao: descricao,
            alt: req.body.alt,
        }
        const post_atualizado = await atualizarPost(id, post);
        res.status(200).json(post_atualizado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição."});
    };
};