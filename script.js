async function buscarLocais() {
  try {
    const resposta = await fetch("./dados.json");
    const dados = await resposta.json();

    const cidadeInput = document.getElementById("cidade").value.toLowerCase().trim();
    const tipoSelecionado = document.getElementById("tipo").value;

    const resultados = dados.filter(item => {
      const cidadeItem = item.cidade.toLowerCase();

      // Verifica cidade (se vazio, aceita tudo)
      const mesmaCidade = cidadeInput === "" || cidadeItem.includes(cidadeInput);

      // Verifica tipo (agora como array)
      const temTipo = tipoSelecionado === "" || item.tipo.includes(tipoSelecionado);

      return mesmaCidade && temTipo;
    });

    mostrarResultados(resultados);

  } catch (erro) {
    console.error("Erro ao carregar os dados:", erro);
      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <p>Erro ao carregar os dados. Tente novamente.</p>
      `
      container.appendChild(div);
  }

    
}

function mostrarResultados(lista) {
  const container = document.getElementById("resultados");
  container.innerHTML = "";

  if (lista.length === 0) {
    const div = document.createElement("div")
    div.className = "card";

    div.innerHTML = `
    <p>Nehum Local Encontrado</p>
    `;

    container.appendChild(div);

  }

  lista.forEach(local => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${local.nome}</h3>
      <p><strong>Endereço:</strong> ${local.endereco}</p>
      <p><strong>Telefone:</strong> ${local.telefone}</p>
      <p><strong>Serviços:</strong> ${local.tipo.join(", ")}</p>
      <p>${local.descricao}</p>
      <a href="${local.maps}" target="_blank">Abrir no mapa</a>
    `;

    container.appendChild(div);
  });
}