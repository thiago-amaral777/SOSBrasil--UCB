/**
 * ═══════════════════════════════════════════════════════════
 * SOSBrasil - Home
 * ═══════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
  // ─────────────────────────────────────────────────────────
  // CARROSSEL DE IMAGENS
  // ─────────────────────────────────────────────────────────

  class Carrossel {
    constructor() {
      this.carrossel = document.querySelector('.carrossel');
      this.imagem = document.querySelector('.imagem-carrossel');
      this.setaEsquerda = document.querySelector('.seta.esquerda');
      this.setaDireita = document.querySelector('.seta.direita');
      this.indexAtual = 0;

      // Array de imagens (URLs)
      this.imagens = [
        'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=400&fit=crop'
      ];

      if (this.imagem) {
        this.imagem.src = this.imagens[0];
      }

      this.inicializar();
    }

    inicializar() {
      if (this.setaEsquerda) {
        this.setaEsquerda.addEventListener('click', () => this.anterior());
      }
      if (this.setaDireita) {
        this.setaDireita.addEventListener('click', () => this.proximo());
      }
    }

    proximo() {
      this.indexAtual = (this.indexAtual + 1) % this.imagens.length;
      this.atualizarImagem();
    }

    anterior() {
      this.indexAtual = (this.indexAtual - 1 + this.imagens.length) % this.imagens.length;
      this.atualizarImagem();
    }

    atualizarImagem() {
      if (this.imagem) {
        this.imagem.style.opacity = '0.5';
        setTimeout(() => {
          this.imagem.src = this.imagens[this.indexAtual];
          this.imagem.style.opacity = '1';
        }, 200);
      }
    }
  }

  const carrossel = new Carrossel();

  // ─────────────────────────────────────────────────────────
  // PAGINAÇÃO DE POSTS
  // ─────────────────────────────────────────────────────────

  class PaginacaoPosts {
    constructor() {
      this.colunaPosts = document.querySelector('.coluna-posts');
      this.botoesPaginacao = document.querySelectorAll('.paginacao .btn-paginacao');
      this.paginaAtual = 1;
      this.postsPerPage = 4;

      // Todos os posts (simulado - em produção viria de uma API)
      this.posts = [
        {
          id: 1,
          titulo: 'POST 1',
          imagem: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=300&h=200&fit=crop',
          texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          autor: 'Usuário'
        },
        {
          id: 2,
          titulo: 'POST 2',
          imagem: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=300&h=200&fit=crop',
          texto: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
          autor: 'Usuário'
        },
        {
          id: 3,
          titulo: 'POST 3',
          imagem: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&h=200&fit=crop',
          texto: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
          autor: 'Usuário'
        },
        {
          id: 4,
          titulo: 'POST 4',
          imagem: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=300&h=200&fit=crop',
          texto: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.',
          autor: 'Usuário'
        },
        {
          id: 5,
          titulo: 'POST 5',
          imagem: 'https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=300&h=200&fit=crop',
          texto: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.',
          autor: 'Usuário'
        },
        {
          id: 6,
          titulo: 'POST 6',
          imagem: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=300&h=200&fit=crop',
          texto: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
          autor: 'Usuário'
        }
      ];

      this.inicializar();
    }

    inicializar() {
      this.botoesPaginacao.forEach((btn, index) => {
        btn.addEventListener('click', () => {
          if (index === 0) this.anterior();
          else this.proximo();
        });
      });

      this.renderizar();
    }

    renderizar() {
      const inicio = (this.paginaAtual - 1) * this.postsPerPage;
      const fim = inicio + this.postsPerPage;
      const postsVisibles = this.posts.slice(inicio, fim);

      // Encontrar container de posts
      const containerPosts = this.colunaPosts.querySelector('.card-post')?.parentElement;
      if (!containerPosts) return;

      // Remover posts antigos (manter paginação)
      const postsAntigos = containerPosts.querySelectorAll('.card-post');
      postsAntigos.forEach(post => post.remove());

      // Adicionar novos posts
      postsVisibles.forEach(post => {
        const cardPost = document.createElement('article');
        cardPost.className = 'card-post';
        cardPost.innerHTML = `
          <div class="post-imagem">
            <img src="${post.imagem}" alt="${post.titulo}" />
          </div>
          <div class="post-conteudo">
            <h3 class="post-titulo">${post.titulo}</h3>
            <p class="post-texto">${post.texto}</p>
            <div class="post-rodape">
              <div class="post-autor">
                <div class="avatar"></div>
                <span>${post.autor}</span>
              </div>
              <button class="btn-post">Ler mais</button>
            </div>
          </div>
        `;

        // Evento dos botões
        cardPost.querySelector('.btn-post').addEventListener('click', () => {
          SOS.mostrarMensagem(`Lendo: ${post.titulo}`, 'info');
        });

        containerPosts.appendChild(cardPost);
      });

      this.atualizarBotoes();
    }

    proximo() {
      const maxPages = Math.ceil(this.posts.length / this.postsPerPage);
      if (this.paginaAtual < maxPages) {
        this.paginaAtual++;
        this.renderizar();
      }
    }

    anterior() {
      if (this.paginaAtual > 1) {
        this.paginaAtual--;
        this.renderizar();
      }
    }

    atualizarBotoes() {
      const maxPages = Math.ceil(this.posts.length / this.postsPerPage);
      this.botoesPaginacao[0].disabled = this.paginaAtual === 1;
      this.botoesPaginacao[1].disabled = this.paginaAtual === maxPages;
    }
  }

  const paginacao = new PaginacaoPosts();

  // ─────────────────────────────────────────────────────────
  // BOTÃO "VER MAIS" DO AVISO
  // ─────────────────────────────────────────────────────────

  const btnVerMais = document.querySelector('.btn-ver-mais');
  if (btnVerMais) {
    btnVerMais.addEventListener('click', () => {
      SOS.mostrarMensagem('Abrindo avisos completos...', 'info');
    });
  }

  // ─────────────────────────────────────────────────────────
  // BOTÕES DE NOTÍCIAS E AJUDA
  // ─────────────────────────────────────────────────────────

  const btnVerTodas = document.querySelector('.btn-ver-todas');
  if (btnVerTodas) {
    btnVerTodas.addEventListener('click', () => {
      SOS.mostrarMensagem('Carregando todas as notícias...', 'info');
    });
  }

  const botoesAjudar = document.querySelectorAll('.btn-ajudar');
  botoesAjudar.forEach(btn => {
    btn.addEventListener('click', () => {
      SOS.irPara('financeiro.html');
    });
  });

  console.log('✓ Home inicializado');
});