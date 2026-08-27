/**
 * ═══════════════════════════════════════════════════════════
 * SOSBrasil - Login/Cadastro
 * ═══════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
  // ─────────────────────────────────────────────────────────
  // ELEMENTOS DO FORMULÁRIO
  // ─────────────────────────────────────────────────────────

  const inputEmail = document.querySelector('input[type="email"]');
  const inputNome = document.querySelector('input[placeholder="Digite seu nome completo"]');
  const inputSenha = document.querySelectorAll('input[type="password"]')[0];
  const inputConfirmaSenha = document.querySelectorAll('input[type="password"]')[1];
  const inputIdade = document.querySelector('input[type="number"]');
  const inputGenero = document.querySelector('input[placeholder="Digite seu gênero"]');
  const inputEndereco = document.querySelector('input[placeholder="Digite seu endereço completo"]');
  const inputRenda = document.querySelector('input[placeholder="Selecione sua média de renda"]');
  const selectTipo = document.querySelector('select');
  const checkboxTermos = document.querySelector('#termos');
  const btnCadastrar = document.querySelector('.btn-cadastrar');
  const linkLogin = document.querySelector('.login-link a');

  // ─────────────────────────────────────────────────────────
  // VALIDAÇÕES EM TEMPO REAL
  // ─────────────────────────────────────────────────────────

  if (inputEmail) {
    inputEmail.addEventListener('blur', () => {
      if (inputEmail.value && !SOS.validarEmail(inputEmail.value)) {
        inputEmail.style.borderColor = '#ef4444';
        SOS.mostrarMensagem('E-mail inválido', 'erro');
      } else {
        inputEmail.style.borderColor = '';
      }
    });
  }

  if (inputIdade) {
    inputIdade.addEventListener('blur', () => {
      if (inputIdade.value && !SOS.validarIdade(parseInt(inputIdade.value))) {
        inputIdade.style.borderColor = '#ef4444';
        SOS.mostrarMensagem('Idade deve estar entre 13 e 120 anos', 'erro');
      } else {
        inputIdade.style.borderColor = '';
      }
    });
  }

  if (inputSenha) {
    inputSenha.addEventListener('blur', () => {
      if (inputSenha.value && !SOS.validarSenha(inputSenha.value)) {
        inputSenha.style.borderColor = '#ef4444';
        SOS.mostrarMensagem('Senha deve ter no mínimo 6 caracteres', 'erro');
      } else {
        inputSenha.style.borderColor = '';
      }
    });
  }

  if (inputConfirmaSenha && inputSenha) {
    inputConfirmaSenha.addEventListener('blur', () => {
      if (inputConfirmaSenha.value !== inputSenha.value) {
        inputConfirmaSenha.style.borderColor = '#ef4444';
        SOS.mostrarMensagem('As senhas não coincidem', 'erro');
      } else {
        inputConfirmaSenha.style.borderColor = '';
      }
    });
  }

  // ─────────────────────────────────────────────────────────
  // CADASTRO
  // ─────────────────────────────────────────────────────────

  if (btnCadastrar) {
    btnCadastrar.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Validações
      if (!inputEmail?.value) {
        SOS.mostrarMensagem('Preencha o e-mail', 'erro');
        return;
      }

      if (!SOS.validarEmail(inputEmail.value)) {
        SOS.mostrarMensagem('E-mail inválido', 'erro');
        return;
      }

      if (!inputNome?.value) {
        SOS.mostrarMensagem('Preencha o nome completo', 'erro');
        return;
      }

      if (!inputSenha?.value) {
        SOS.mostrarMensagem('Preencha a senha', 'erro');
        return;
      }

      if (!SOS.validarSenha(inputSenha.value)) {
        SOS.mostrarMensagem('Senha deve ter no mínimo 6 caracteres', 'erro');
        return;
      }

      if (inputConfirmaSenha?.value !== inputSenha.value) {
        SOS.mostrarMensagem('As senhas não coincidem', 'erro');
        return;
      }

      if (!inputIdade?.value) {
        SOS.mostrarMensagem('Preencha a idade', 'erro');
        return;
      }

      if (!SOS.validarIdade(parseInt(inputIdade.value))) {
        SOS.mostrarMensagem('Idade deve estar entre 13 e 120 anos', 'erro');
        return;
      }

      if (!inputGenero?.value) {
        SOS.mostrarMensagem('Preencha o gênero', 'erro');
        return;
      }

      if (!inputEndereco?.value) {
        SOS.mostrarMensagem('Preencha o endereço', 'erro');
        return;
      }

      if (!selectTipo?.value) {
        SOS.mostrarMensagem('Selecione uma opção de tipo de usuário', 'erro');
        return;
      }

      if (!checkboxTermos?.checked) {
        SOS.mostrarMensagem('Você deve aceitar os termos de uso', 'erro');
        return;
      }

      // Preparar dados do cadastro
      const dadosCadastro = {
        email: inputEmail.value,
        nome: inputNome.value,
        idade: parseInt(inputIdade.value),
        genero: inputGenero.value,
        endereco: inputEndereco.value,
        renda: inputRenda?.value || 'Não informada',
        tipo: selectTipo.value,
        dataCadastro: new Date().toISOString()
      };

      // Salvar dados (simulado)
      if (SOS.salvarDados('usuario_cadastro', dadosCadastro)) {
        SOS.mostrarMensagem('Cadastro realizado com sucesso! 🎉', 'sucesso');
        
        // Limpar formulário
        setTimeout(() => {
          document.querySelector('form')?.reset();
          // Redirecionar após 2 segundos
          setTimeout(() => {
            SOS.irPara('home.html');
          }, 1500);
        }, 500);
      } else {
        SOS.mostrarMensagem('Erro ao realizar cadastro', 'erro');
      }
    });
  }

  // ─────────────────────────────────────────────────────────
  // TOGGLE LOGIN/CADASTRO
  // ─────────────────────────────────────────────────────────

  if (linkLogin) {
    linkLogin.addEventListener('click', (e) => {
      e.preventDefault();
      SOS.mostrarMensagem('Redirecionando para login...', 'info');
      // Aqui você poderia fazer um toggle visual ou redirecionar
      // Por enquanto, vamos manter como está
    });
  }

  // ─────────────────────────────────────────────────────────
  // LOGIN COM REDES SOCIAIS
  // ─────────────────────────────────────────────────────────

  const botoesLogin = document.querySelectorAll('.social-btn');
  botoesLogin.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const texto = btn.textContent.trim();
      SOS.mostrarMensagem(`Login com ${texto} em desenvolvimento`, 'info');
    });
  });

  // ─────────────────────────────────────────────────────────
  // LINKS DE TERMOS E ESQUECI SENHA
  // ─────────────────────────────────────────────────────────

  const linksTermos = document.querySelectorAll('.termo-item');
  linksTermos.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const titulo = link.querySelector('span').textContent;
      SOS.mostrarMensagem(`Abrindo: ${titulo}`, 'info');
    });
  });

  console.log('✓ Login/Cadastro inicializado');
});