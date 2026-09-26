console.log("Portfólio carregado com sucesso!");

/* PARTE 1 — Projetos em destaque, carregados via fetch() + JSON */
const projetosDestaqueGrid = document.querySelector("#projetosDestaqueGrid");

// Cria o card de um projeto 
function criarCardProjeto(projeto) {
    const artigo = document.createElement("article");
    artigo.className = "projeto-card";

    // Vitrine com classe de fundo personalizada
    const vitrine = document.createElement("div");
    vitrine.className = `projeto-vitrine ${projeto.classeVitrine || "vitrine-destaque"}`;

    // Tag de categoria no topo
    const tagCategoria = document.createElement("span");
    tagCategoria.className = "projeto-categoria-tag";
    tagCategoria.textContent = projeto.categoria || "Projeto";
    vitrine.appendChild(tagCategoria);

    // Logo do projeto
    if (projeto.imagem) {
        const img = document.createElement("img");
        img.src = projeto.imagem;
        img.alt = projeto.alt || `Logo ${projeto.titulo}`;
        img.className = "logo-projeto-img";
        img.onerror = () => { img.style.display = "none"; };
        vitrine.appendChild(img);
    }

    const corpo = document.createElement("div");
    corpo.className = "projeto-corpo";

    // Tags técnicas individuais (.tag-tecnica)
    const tagsTecnicas = document.createElement("div");
    tagsTecnicas.className = "projeto-tags-tecnicas";
    if (projeto.tecnologia) {
        projeto.tecnologia
            .split(",")
            .map((tec) => tec.trim())
            .filter(Boolean)
            .forEach((tec) => {
                const tag = document.createElement("span");
                tag.className = "tag-tecnica";
                tag.textContent = tec;
                tagsTecnicas.appendChild(tag);
            });
    }

    const titulo = document.createElement("h3");
    titulo.textContent = projeto.titulo;

    const descricao = document.createElement("p");
    descricao.textContent = projeto.descricao;

    corpo.appendChild(tagsTecnicas);
    corpo.appendChild(titulo);
    corpo.appendChild(descricao);

    // Botão "Ver projeto", só exibido quando há um link válido
    if (projeto.link && projeto.link !== "#") {
        const rodape = document.createElement("div");
        rodape.className = "projeto-rodape";

        const botao = document.createElement("a");
        botao.href = projeto.link;
        botao.target = "_blank";
        botao.rel = "noopener noreferrer";
        botao.className = "btn-projeto";
        botao.title = `Acessar ${projeto.titulo}`;
        botao.innerHTML = `
            <span class="btn-texto">${projeto.textoBotao || "Ver projeto"}</span>
            <span class="btn-icone-wrapper">
                <img src="assets/icones/seta-direita.svg" class="icone-btn-seta" alt="" aria-hidden="true">
            </span>
        `;

        rodape.appendChild(botao);
        corpo.appendChild(rodape);
    }

    artigo.appendChild(vitrine);
    artigo.appendChild(corpo);
    return artigo;
}

fetch("projetos.json")
    .then((resposta) => {
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        return resposta.json();
    })
    .then((projetos) => {
        console.log(projetos);

        projetosDestaqueGrid.innerHTML = "";

        if (!Array.isArray(projetos) || projetos.length === 0) {
            projetosDestaqueGrid.innerHTML =
                '<p class="projetos-status">Nenhum projeto encontrado no momento.</p>';
            return;
        }

        projetos.forEach((projeto) => {
            projetosDestaqueGrid.appendChild(criarCardProjeto(projeto));
        });
    })
    .catch((erro) => {
        console.error("Erro ao carregar projetos:", erro);
        projetosDestaqueGrid.innerHTML =
            '<p class="projetos-status projetos-status-erro">Não foi possível carregar os projetos no momento. Tente novamente mais tarde.</p>';
    });

// Elementos do formulário
const formContato = document.querySelector("#formContato");
const inputNome = document.querySelector("#nome");
const inputEmail = document.querySelector("#email");
const textareaMensagem = document.querySelector("#mensagem");
const checkboxAceite = document.querySelector("#aceite");

// Elementos de mensagem de erro (um por campo)
const erroNome = document.querySelector("#erroNome");
const erroEmail = document.querySelector("#erroEmail");
const erroMensagem = document.querySelector("#erroMensagem");
const erroAceite = document.querySelector("#erroAceite");

// Feedback geral (sucesso ou falha)
const mensagemFeedback = document.querySelector("#mensagemFeedback");

// Nome: obrigatório, mínimo 3 caracteres (sem contar espaços nas pontas)
function validarNome() {
    const valor = inputNome.value.trim();

    if (valor === "") {
        erroNome.textContent = "O campo Nome não pode ficar vazio.";
    } else if (valor.length < 3) {
        erroNome.textContent = "O Nome deve ter pelo menos 3 caracteres.";
    } else {
        erroNome.textContent = "";
        inputNome.classList.remove("campo-erro");
        return true;
    }

    inputNome.classList.add("campo-erro");
    return false;
}

// E-mail: obrigatório, precisa conter "@" e "."
function validarEmail() {
    const valor = inputEmail.value.trim();
    const formatoValido = valor.includes("@") && valor.includes(".");

    if (valor === "") {
        erroEmail.textContent = "O campo E-mail não pode ficar vazio.";
    } else if (!formatoValido) {
        erroEmail.textContent = "Informe um e-mail válido contendo '@' e '.'.";
    } else {
        erroEmail.textContent = "";
        inputEmail.classList.remove("campo-erro");
        return true;
    }

    inputEmail.classList.add("campo-erro");
    return false;
}

// Mensagem: mínimo 10 caracteres úteis
function validarMensagem() {
    const valor = textareaMensagem.value.trim();

    if (valor.length < 10) {
        erroMensagem.textContent = "A mensagem deve possuir pelo menos 10 caracteres úteis.";
        textareaMensagem.classList.add("campo-erro");
        return false;
    }

    erroMensagem.textContent = "";
    textareaMensagem.classList.remove("campo-erro");
    return true;
}

// Aceite: checkbox precisa estar marcado
function validarAceite() {
    if (!checkboxAceite.checked) {
        erroAceite.textContent = "Você deve concordar com os termos para continuar.";
        checkboxAceite.classList.add("campo-erro");
        return false;
    }

    erroAceite.textContent = "";
    checkboxAceite.classList.remove("campo-erro");
    return true;
}

// Limpa erros e destaques de todos os campos (usado após envio com sucesso)
function limparDestaquesEErros() {
    [erroNome, erroEmail, erroMensagem, erroAceite].forEach((el) => (el.textContent = ""));
    [inputNome, inputEmail, textareaMensagem, checkboxAceite].forEach((el) =>
        el.classList.remove("campo-erro")
    );
}

/*  PARTE 2 — Do formulário para os dados (objeto -> JSON -> envio simulado)
 */

// Desafio extra: envia os dados via fetch() com POST para uma API de testes
function enviarParaApiDeTestes(dadosJSON) {

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: dadosJSON
    })
        .then((resposta) => resposta.json())
        .then((resultado) => {
            console.log("Resposta da API de testes:", resultado);
        })
        .catch((erro) => {
            console.error("Erro ao enviar para a API de testes:", erro);
        });
}

// Envio do formulário: valida tudo antes de preparar e "enviar" os dados
formContato.addEventListener("submit", function (event) {
    // impede o recarregamento automático da página
    event.preventDefault();

    // executa as validações já desenvolvidas
    const nomeValido = validarNome();
    const emailValido = validarEmail();
    const mensagemValida = validarMensagem();
    const aceiteValido = validarAceite();

    const formularioValido = nomeValido && emailValido && mensagemValida && aceiteValido;

    if (!formularioValido) {
        mensagemFeedback.textContent = "Por favor, corrija os campos destacados antes de enviar.";
        mensagemFeedback.className = "mensagem-feedback erro-geral";

        console.log("O formulário contém erros que precisam ser corrigidos.");
        return;
    }

    // junta os dados válidos em um objeto JavaScript
    const dados = {
        nome: inputNome.value.trim(),
        email: inputEmail.value.trim(),
        mensagem: textareaMensagem.value.trim()
    };

    // convertendo para json
    const dadosJSON = JSON.stringify(dados);

    // mostrando no console(json)
    console.log("JSON preparado para envio:", dadosJSON);

    // mostrando na interface
    mensagemFeedback.textContent = "Enviando mensagem...";
    mensagemFeedback.className = "mensagem-feedback enviando";

    const botaoEnviar = document.querySelector("#btnEnviar");
    if (botaoEnviar) {
        botaoEnviar.disabled = true;
    }

    // Simulação do tempo de resposta de um servidor
    setTimeout(() => {
        // finaliza apresentando uma mensagem de sucesso para o usuário
        mensagemFeedback.textContent = "Mensagem enviada com sucesso!";
        mensagemFeedback.className = "mensagem-feedback sucesso";

        if (botaoEnviar) {
            botaoEnviar.disabled = false;
        }

        formContato.reset();
        limparDestaquesEErros();

        console.log("Formulário validado e enviado (simulação) com sucesso!");
    }, 1200);

    // desafio extra: envio real (POST) para uma API de testes
    enviarParaApiDeTestes(dadosJSON);
});

// Validação em tempo real, enquanto o usuário digita/corrige (desafio adicional)
inputNome.addEventListener("input", validarNome);
inputEmail.addEventListener("input", validarEmail);
textareaMensagem.addEventListener("input", validarMensagem);
checkboxAceite.addEventListener("change", validarAceite);

// Interações extras do Portfólio (cards de projeto)
const btnProjetoCuida = document.querySelector("#btnProjetoCuida");
if (btnProjetoCuida) {
    btnProjetoCuida.addEventListener("click", () => {
        console.log("Visualizando detalhes do projeto Cuida+!");
    });
}

const btnOlivia = document.querySelector("#btnOlivia");
if (btnOlivia) {
    btnOlivia.addEventListener("click", () => {
        console.log("Visualizando detalhes do projeto Olivia Uviplais!");
    });
}
