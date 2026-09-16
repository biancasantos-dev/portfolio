console.log("Portfólio carregado com sucesso!");

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

// Envio do formulário: valida tudo antes de aceitar o envio
formContato.addEventListener("submit", function (event) {
    event.preventDefault();

    const nomeValido = validarNome();
    const emailValido = validarEmail();
    const mensagemValida = validarMensagem();
    const aceiteValido = validarAceite();

    const formularioValido = nomeValido && emailValido && mensagemValida && aceiteValido;

    if (formularioValido) {
        mensagemFeedback.textContent = "Mensagem enviada com sucesso!";
        mensagemFeedback.className = "mensagem-feedback sucesso";

        formContato.reset();
        limparDestaquesEErros();

        console.log("Formulário validado e enviado com sucesso!");
    } else {
        mensagemFeedback.textContent = "Por favor, corrija os campos destacados antes de enviar.";
        mensagemFeedback.className = "mensagem-feedback erro-geral";

        console.log("O formulário contém erros que precisam ser corrigidos.");
    }
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
