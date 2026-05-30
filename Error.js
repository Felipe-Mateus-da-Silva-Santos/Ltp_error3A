class CadastroError extends Error {
    constructor(erros) {
        super("Erro de validação no cadastro");
        this.name = "CadastroError";
        this.erros = erros;
    }
}

function validarCadastro(dados) {
    const erros = [];

    if (!dados.nome || dados.nome.length < 3) {
        erros.push("nome");
    }
    if (!dados.email || !dados.email.includes("@")) {
        erros.push("email");
    }
    if (!dados.senha || dados.senha.length < 6) {
        erros.push("senha");
    }
    if (dados.idade === undefined || dados.idade < 18) {
        erros.push("idade");
    }

    if (erros.length > 0) {
        throw new CadastroError(erros);
    }

    return true;
}

function processarCadastro(dados) {
    try {
        validarCadastro(dados);
        return {
            sucesso: true,
            dados
        };
    } catch (erro) {
        if (erro instanceof CadastroError) {
            return {
                sucesso: false,
                erros: erro.erros
            };
        }
        return {
            sucesso: false,
            erros: ["Erro inesperado"]
        };
    }
}


console.log(processarCadastro({
    nome: "João Silva",
    email: "joao@email.com",
    senha: "123456",
    idade: 20
}));

console.log(processarCadastro({
    nome: "Jo",
    email: "email-invalido",
    senha: "123",
    idade: 16
}));
