// Objeto global do herói com nome e quantidade de vidas
const heroi = {
    nome: '',
    vidas: 3
};

// Função para carregar os finais
function carregarFinal(tipoFinal) {
    let final = {};
    
    if (tipoFinal === 'heroi') {
        final = {
            titulo: 'Final Heróico',
            descricao: `Parabéns! ${heroi.nome} tomou as melhores decisões e derrotou todos os desafios. Ele volta ao reino como o herói que salvou a Terra dos Pesadelos.`,
            imagem: 'images/finalHeroico.webp'
        };
    } else if (tipoFinal === 'neutro') {
        final = {
            titulo: 'Final Neutro',
            descricao: `${heroi.nome} completou a jornada, mas com muitas perdas. Ele retorna ao reino tendo sacrificado muito para vencer os desafios.`,
            imagem: 'images/finalNeutro.webp'
        };
    } else if (tipoFinal === 'derrota') {
        final = {
            titulo: 'Derrota',
            descricao: `${heroi.nome} foi derrotado pelos monstros. A Terra dos Pesadelos continua governada pelas trevas.`,
            imagem: 'images/finalDerrota.webp'
        };
    }

    // Atualiza a tela com o final
    document.getElementById('titulo-cenario').textContent = final.titulo;
    document.getElementById('descricao-cenario').textContent = final.descricao;
    document.getElementById('imagem-cenario').src = final.imagem;

    // Esconde os botões de escolha, pois o jogo acabou
    document.getElementById('botoes-escolhas').style.display = 'none';

    // Limpa qualquer desafio na tela
    document.getElementById('desafio-cenario').textContent = '';

    // Exibe o botão de reiniciar o jogo
    const reiniciarButton = document.createElement('button');
    reiniciarButton.id = 'reiniciar-jogo'; // Atribui um ID único ao botão
    reiniciarButton.textContent = 'Reiniciar Jogo';
    reiniciarButton.style.marginTop = '20px';
    reiniciarButton.style.padding = '10px 20px';
    reiniciarButton.style.fontSize = '18px';
    reiniciarButton.style.backgroundColor = '#4b3621';
    reiniciarButton.style.color = '#f0e5d1';
    reiniciarButton.style.border = '2px solid #2f1d0f';
    reiniciarButton.style.borderRadius = '8px';
    reiniciarButton.style.cursor = 'pointer';
    reiniciarButton.style.display = 'block';
    reiniciarButton.style.margin = '0 auto'; // Centraliza o botão

    // Adiciona a ação de reiniciar o jogo
    reiniciarButton.onclick = function() {
        reiniciarJogo(); // Função para reiniciar o jogo
    };

    // Adiciona o botão de reiniciar na tela abaixo das vidas
    document.querySelector('main').appendChild(reiniciarButton);
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Restaura o objeto herói
    heroi.nome = '';
    heroi.vidas = 3;

    // Esconde a tela de final e mostra a tela de configuração
    document.getElementById('inicio-jogo').style.display = 'none';
    document.getElementById('config').style.display = 'flex';

    // Libera os botões de escolha, pois o jogo acabou
    document.getElementById('botoes-escolhas').style.display = 'block';
    
    // Limpa os campos antigos e prepara para um novo jogo
    document.getElementById('nome-jogador').value = '';
    document.getElementById('vidas-restantes').textContent = heroi.vidas;

    // Remove o botão de reiniciar jogo de forma específica
    const reiniciarButton = document.getElementById('reiniciar-jogo');
    if (reiniciarButton) {
        reiniciarButton.remove();
    }
}

// Cenários do jogo (definidos antes para evitar o erro de inicialização)
let cenarios = [];

function definirCenarios() {
    cenarios = [
        {
            titulo: 'O Labirinto dos Portais',
            descricao: `${heroi.nome} chega a um grande labirinto cheio de portais mágicos. Cada portal está trancado com uma sequência de números.`,
            imagem: 'images/cenario1.webp',
            desafio: 'Escolha a melhor forma de abrir o portal e prosseguir no labirinto.',
            opcoes: [
                { texto: 'Testar a combinação 1, 2, 3', mensagem: 'A combinação correta!', proximoCenario: 1 }, // Avança para o cenário 2
                { texto: 'Testar todas as combinações possíveis', mensagem: `${heroi.nome} conseguiu! Mas perdeu 1 vida devido ao esforço.`, perdeVida: true, proximoCenario: 1 },
                { texto: 'Tentar abrir a porta à força', mensagem: `Uma armadilha é ativada e ${heroi.nome} perde 1 vida.`, perdeVida: true }
            ]
        },
        {
            titulo: 'O Enigma do Monstro Guardião',
            descricao: `Depois de escapar do labirinto, ${heroi.nome} encontra um monstro guardando a saída. Para passar, ele precisa responder a um enigma. O monstro pergunta: "Se você quiser passar, me diga qual das opções seguintes é verdadeira para todos os números pares."`,
            imagem: 'images/cenario2.webp',
            desafio: 'Escolha a resposta correta para que o mostro libere o caminho.',
            opcoes: [
                { texto: 'Todo número par é divisível por 2', mensagem: `Resposta correta! ${heroi.nome} avança.`, proximoCenario: 2 }, // O próximo cenário ainda não foi definido
                { texto: 'Todo número par é maior que 10', mensagem: `O monstro ataca e ${heroi.nome} perde 1 vida.`, perdeVida: true },
                { texto: 'Todo número par é um múltiplo de 3', mensagem: `O monstro ataca e ${heroi.nome} perde 1 vida.`, perdeVida: true }
            ]
        },
        {
            titulo: 'A Torre da Recursão',
            descricao: `${heroi.nome} chega a uma torre imensa, e o caminho para o topo está cheio de enigmas em cada andar. Cada andar depende de resolver uma versão menor do enigma anterior.`,
            imagem: 'images/cenario3.webp',
            desafio: 'Use a lógica para resolver os enigmas e subir ao topo.',
            opcoes: [
                { texto: 'Subir andar por andar, resolvendo cada enigma passo a passo', mensagem: `Correto! ${heroi.nome} resolve os enigmas e sobe ao topo.`, proximoCenario: 3 },
                { texto: 'Tentar pular andares usando magia', mensagem: `${heroi.nome} erra a magia e sofre uma queda, de volta ao inicio da torre`, perdeVida: true },
                { texto: 'Voltar ao início e tentar outro caminho', mensagem: `${heroi.nome} se perde e não avança.`, proximoCenario: 2 }
            ]
        },
        {
            titulo: 'Batalha com o Dragão Algoritmo',
            descricao: `Ao chegar ao topo da torre, ${heroi.nome} encontra um dragão que segue padrões fixos em seus ataques. Para derrotá-lo, ele precisa reconhecer e atacar nos momentos certos.`,
            imagem: 'images/cenario4.webp',
            desafio: 'Identifique o padrão de ataque do dragão e escolha o momento certo para atacar.',
            opcoes: [
                { texto: 'Defender por dois turnos e atacar no terceiro', mensagem: `${heroi.nome} identifica o padrão e derrota o dragão!`, proximoCenario: 4 },
                { texto: 'Atacar imediatamente', mensagem: `O dragão contra-ataca e ${heroi.nome} perde 1 vida.`, perdeVida: true },
                { texto: 'Esquivar e atacar a cada turno', mensagem: `O dragão prevê suas ações e ataca, ${heroi.nome} perde 1 vida.`, perdeVida: true }
            ]
        },
        {
            titulo: 'Companheiros de Jornada',
            descricao: `Após derrotar o dragão, ${heroi.nome} encontra um grupo de heróis prontos para se juntar à sua jornada. Ele só pode escolher 3 companheiros para ajudá-lo no desafio final.`,
            imagem: 'images/cenario5.webp',
            desafio: 'Escolha sabiamente os membros de sua equipe, considerando suas habilidades.',
            opcoes: [
                { texto: 'Escolher Guerreiro, Mago e Arqueiro', mensagem: `${heroi.nome} escolhe uma equipe equilibrada e avança!`, proximoCenario: 5 },
                { texto: 'Escolher 3 Guerreiros', mensagem: `A falta de diversidade prejudica, ${heroi.nome} perde 1 vida.`, perdeVida: true },
                { texto: 'Escolher Mago, Curandeiro e Ladrão', mensagem: `${heroi.nome} avança com habilidades mágicas e furtivas!`, proximoCenario: 5 }
            ]
        },
        {
            titulo: 'Puzzle do Castelo',
            descricao: `${heroi.nome} chega a um castelo cheio de armadilhas. Para desativar as armadilhas, ele precisa executar a função correta que interaja com o sistema mágico do castelo.`,
            imagem: 'images/cenario6.webp',
            desafio: 'Escolha a função correta para desativar as armadilhas e abrir a porta.',
            opcoes: [
                { 
                    texto: 'Executar Função A (Parâmetro: abrir porta)', 
                    mensagem: `A porta se abre e ${heroi.nome} avança!`, 
                    proximoCenario: null, 
                    final: function() {
                        if (heroi.vidas === 3) {
                            carregarFinal('heroi');
                        } else if (heroi.vidas > 0) {
                            carregarFinal('neutro');
                        }
                    }
                },
                { texto: 'Executar Função B (Parâmetro: ativar armadilhas)', mensagem: `As armadilhas são ativadas e ${heroi.nome} perde 1 vida.`, perdeVida: true },
                { texto: 'Executar Função C (Parâmetro: fechar todas as saídas)', mensagem: `A porta se tranca e ${heroi.nome} perde 1 vida.`, perdeVida: true }
            ]
        }
    ];
}

// Função para salvar o nome e mostrar a parte inicial do jogo
function iniciarJogo() {
    const nome = document.getElementById('nome-jogador').value;
    if (nome.trim()) {
        // Salva o nome no objeto herói e define as vidas
        heroi.nome = nome;
        heroi.vidas = 3; // Inicia com 3 vidas

        // Define os cenários após definir o nome do herói
        definirCenarios();

        // Atualiza a interface para iniciar o jogo
        document.getElementById('config').style.display = 'none';
        document.getElementById('inicio-jogo').style.display = 'block';

        document.getElementById('vidas-restantes').textContent = heroi.vidas;

        // Carregar o primeiro cenário
        carregarCenario(cenarios[0]);
    } else {
        alert('Por favor, digite um nome para o herói!');
    }
}

function shuffleArray(array) {
    // Embaralha o array usando o algoritmo Fisher-Yates
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos de lugar
    }
    return array;
}

// Função para carregar o cenário e atualizar a interface com imagem e opções
function carregarCenario(cenario) {
    // Embaralha as opções antes de exibi-las
    const opcoesEmbaralhadas = shuffleArray(cenario.opcoes);

    // Atualiza o título do cenário
    document.getElementById('titulo-cenario').textContent = cenario.titulo;

    // Atualiza a descrição do cenário
    document.getElementById('descricao-cenario').textContent = cenario.descricao;

    // Atualiza a imagem do cenário
    document.getElementById('imagem-cenario').src = cenario.imagem;

    // Atualiza o desafio do cenário
    document.getElementById('desafio-cenario').textContent = cenario.desafio;

    // Atualiza as opções dos botões com as ações correspondentes, embaralhadas
    document.getElementById('opcao1').textContent = opcoesEmbaralhadas[0].texto;
    document.getElementById('opcao1').onclick = function() { fazerEscolha(opcoesEmbaralhadas[0]); };

    document.getElementById('opcao2').textContent = opcoesEmbaralhadas[1].texto;
    document.getElementById('opcao2').onclick = function() { fazerEscolha(opcoesEmbaralhadas[1]); };

    document.getElementById('opcao3').textContent = opcoesEmbaralhadas[2].texto;
    document.getElementById('opcao3').onclick = function() { fazerEscolha(opcoesEmbaralhadas[2]); };
}

function desabilitarBotoes(status) {
    // Pega os botões de escolha e desabilita ou reabilita com base no status
    document.getElementById('opcao1').disabled = status;
    document.getElementById('opcao2').disabled = status;
    document.getElementById('opcao3').disabled = status;
}

// Função para tratar as escolhas do jogador
function fazerEscolha(opcao) {

    // Desabilita os botões enquanto a mensagem é exibida
    desabilitarBotoes(true);

    mostrarMensagem(opcao.mensagem);
    
    // Executa a ação correspondente à escolha do jogador
    setTimeout(function() {
        if (opcao.perdeVida) {
            heroi.vidas--;
            document.getElementById('vidas-restantes').textContent = heroi.vidas;
            verificarVidas();
        }

        if (opcao.proximoCenario !== null && opcao.proximoCenario !== undefined) {
            carregarCenario(cenarios[opcao.proximoCenario]);
        } else if (opcao.final) {
            opcao.final(); // Executa a lógica de final do jogo
        }

        // Reabilita os botões após o timeout de 2 segundos
        desabilitarBotoes(false);
    }, 4000); // Exibe a mensagem por 4 segundos antes de executar a ação
}

// Função para verificar as vidas restantes
function verificarVidas() {
    if (heroi.vidas <= 0) {
        carregarFinal('derrota');
    }
}

// Função para exibir uma mensagem temporária em um estilo de pop-up
function mostrarMensagem(mensagem) {
    const elementoMensagem = document.createElement('div');
    elementoMensagem.id = 'mensagem';
    elementoMensagem.textContent = mensagem;

    // Aplica a estilização de popup e centraliza na tela
    elementoMensagem.style.position = 'fixed';
    elementoMensagem.style.top = '50%';
    elementoMensagem.style.left = '50%';
    elementoMensagem.style.transform = 'translate(-50%, -50%)';
    elementoMensagem.style.zIndex = '1000'; // Garante que o popup fique acima de outros elementos
    elementoMensagem.style.width = '60%'; // Largura do popup
    elementoMensagem.style.padding = '20px';
    elementoMensagem.style.textAlign = 'center';

    // Aplica as classes de estilização
    elementoMensagem.classList.add('popup-mensagem');
    
    document.body.appendChild(elementoMensagem);

    // Remove a mensagem após 2 segundos
    setTimeout(function() {
        elementoMensagem.remove();
    }, 2000);
}

// Quando a página é recarregada ou carregada pela primeira vez
window.onload = function() {
    if (heroi.nome) {
        document.getElementById('config').style.display = 'none';
        document.getElementById('inicio-jogo').style.display = 'block';
        document.getElementById('vidas-restantes').textContent = heroi.vidas;

        // Carregar o cenário atual
        carregarCenario(cenarios[0]);
    }
}
