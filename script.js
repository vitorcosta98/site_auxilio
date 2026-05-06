async function buscarLocais() {
  const resposta = await fetch("dados.json");
  const dados = await resposta.json();

  const cidade = document.getElementById("cidade").value.toLowerCase();
  const tipo = document.getElementById("tipo").value;

  const resultados = dados.filter(item =>
    item.cidade.toLowerCase().includes(cidade) &&
    item.tipo === tipo
  );

  mostrarResultados(resultados);
}

function mostrarResultados(lista) {
  const container = document.getElementById("resultados");
  container.innerHTML = "";

  if (lista.length === 0) {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
        <h3>Nenhum local encontrado.</h3>

    `
    container.appendChild(div)
    
  }

  lista.forEach(local => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${local.nome}</h3>
      <p><strong>Endereço:</strong> ${local.endereco}</p>
      <p><strong>Telefone:</strong> ${local.telefone}</p>
      <p>${local.descricao}</p>
      <a href="${local.maps}" target="_blank">Abrir no mapa</a>
    `;

    container.appendChild(div);
  });
}