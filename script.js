function chargerLaPageEmploye() {
  fetch("http://localhost/projetsr.php/employes/")
    .then((data) => data.json())
    .then((employes) => {
      const tbody = document.getElementById("tbody");
      for (const employe of employes) {
        let tr = document.createElement("tr");
        tr.className = "table-light";
        tr.id = employe.id;
        let th = document.createElement("th");
        th.innerText = employe.id;
        let td1 = document.createElement("td");
        td1.innerText = employe.nom;
        let td2 = document.createElement("td");
        td2.innerText = employe.prenom;
        let td3 = document.createElement("td");
        td3.innerText = employe.adresse;
        let td4 = document.createElement("td");
        td4.innerText = employe.num_compte;
        let td5 = document.createElement("td");
        td5.innerText = employe.grade;
        let td6 = document.createElement("td");
        td6.innerText = employe.superieur;
        let td7 = document.createElement("td");
        let button1 = document.createElement("button");
        button1.setAttribute("type", "button");
        button1.setAttribute(
          "onclick",
          `modifier(${employe.id}, ${employe.superieur})`
        );
        button1.className = "btn btn-warning btn-sm";
        button1.innerText = "modifier";
        td7.appendChild(button1);
        let td8 = document.createElement("td");
        let button2 = document.createElement("button");
        button2.setAttribute("type", "button");
        button2.setAttribute("onclick", `supprimerEmploye(${employe.id})`);
        button2.className = "btn btn-danger btn-sm";
        button2.innerText = "supprimer";

        td8.appendChild(button2);
        tbody.appendChild(tr);
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);
        loadSuperieurs(employe.id, employe.nom, employe.prenom);
      }
    })
    .catch((err) => console.log(err));
}

function loadSuperieurs(id, nom, prenom) {
  const select = document.getElementById("superieur");
  const option = document.createElement("option");
  option.setAttribute("value", id);
  option.innerText = `${id}. ${nom} ${prenom}`;
  select.appendChild(option);
}

function supprimerEmploye(id) {
  fetch(`http://localhost/projetsr.php/employes/${id}`, {
    method: "DELETE",
  })
    .then((data) => data.json())
    .then((res) => {
      console.log(res);
      document.getElementById(id).remove();
    })
    .catch((err) => console.log(err));
}

function ajouterEmploye(e) {
  e.preventDefault();
  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const adresse = document.getElementById("adresse").value;
  const num_compte = document.getElementById("num_compte").value;
  const grade = document.getElementById("grade").value;
  const select = document.getElementById("superieur");
  const superieur = select.options[select.selectedIndex].value;
  const employe = {
    nom,
    prenom,
    adresse,
    num_compte,
    grade,
  };
  superieur ? (employe.superieur = superieur) : (employe.superieur = null);
  fetch("http://localhost/projetsr.php/employes/", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employe),
  })
    .then((data) => data.json())
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => console.log(err));
}

function modifier(id, superieur) {
  fetch(`http://localhost/projetsr.php/employes/${id}`)
    .then((data) => data.json())
    .then((employe) => {
      document.getElementById("modal").style.display = "flex";
      document
        .getElementById("modifyform")
        .setAttribute("onsubmit", `modifierEmploye(event, ${id})`);
      document.getElementById("1nom").value = employe.nom;
      document.getElementById("1prenom").value = employe.prenom;
      document.getElementById("1adresse").value = employe.adresse;
      document.getElementById("1num_compte").value = employe.num_compte;
      document.getElementById("1grade").value = employe.grade;
      const select = document.getElementById("superieur");
      const select1 = document.getElementById("1superieur");
      console.log(select.options);
      let toAdd = "";
      for (const e of select.options) {
        if (e.innerText.startsWith(`${superieur}. `)) {
          toAdd += `<option value="${superieur}" selected>${e.innerText}</option>`;
        } else if (e.innerText.startsWith(`${id}. `)) {
          continue;
        } else {
          toAdd += `${e.outerHTML}`;
        }
      }
      select1.innerHTML = toAdd;
    })
    .catch((err) => console.log(err));
}

function modifierEmploye(e, id) {
  e.preventDefault();
  const nom = document.getElementById("1nom").value;
  const prenom = document.getElementById("1prenom").value;
  const adresse = document.getElementById("1adresse").value;
  const num_compte = document.getElementById("1num_compte").value;
  const grade = document.getElementById("1grade").value;
  const select = document.getElementById("1superieur");
  const superieur = select.options[select.selectedIndex].value;
  const employe = {
    nom,
    prenom,
    adresse,
    num_compte,
    grade,
  };
  superieur ? (employe.superieur = superieur) : (employe.superieur = null);
  fetch(`http://localhost/projetsr.php/employes/${id}`, {
    method: "PUT",
    mode: "cors",
    credentials: "same-origin",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employe),
  })
    .then((data) => data.json())
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => console.log(err));
}

function annuler() {
  document.getElementById("modal").style.display = "none";
}

/*
-------------------------------------------------------------------
-------------------------------------------------------------------
-------------------------------------------------------------------
*/

function chargerLaPageTache() {
  fetch("http://localhost/projetsr.php/taches/")
    .then((data) => data.json())
    .then((taches) => {
      const tbody = document.getElementById("tbody");
      for (const tache of taches) {
        let tr = document.createElement("tr");
        tr.className = "table-light";
        tr.id = tache.id;
        let th = document.createElement("th");
        th.innerText = tache.id;
        let td1 = document.createElement("td");
        td1.innerText = tache.description;
        let td2 = document.createElement("td");
        td2.innerText = tache.id_employe;
        let td3 = document.createElement("td");
        let button1 = document.createElement("button");
        button1.setAttribute("type", "button");
        button1.setAttribute(
          "onclick",
          `modifierT(${tache.id}, ${tache.id_employe})`
        );
        button1.className = "btn btn-warning btn-sm";
        button1.innerText = "modifier";
        td3.appendChild(button1);
        let td4 = document.createElement("td");
        let button2 = document.createElement("button");
        button2.setAttribute("type", "button");
        button2.setAttribute("onclick", `supprimerTache(${tache.id})`);
        button2.className = "btn btn-danger btn-sm";
        button2.innerText = "supprimer";
        td4.appendChild(button2);

        tbody.appendChild(tr);
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
      }
      chargerLaListeEmployeTache();
    })
    .catch((err) => console.log(err));
}

function chargerLaListeEmployeTache() {
  fetch("http://localhost/projetsr.php/employes/")
    .then((data) => data.json())
    .then((employes) => {
      const select = document.getElementById("employe");
      for (const employe of employes) {
        const option = document.createElement("option");
        option.setAttribute("value", employe.id);
        option.innerText = `${employe.id}. ${employe.nom} ${employe.prenom}`;
        select.appendChild(option);
      }
    })
    .catch((err) => console.log(err));
}

function supprimerTache(id) {
  fetch(`http://localhost/projetsr.php/taches/${id}`, {
    method: "DELETE",
  })
    .then((data) => data.json())
    .then((res) => {
      console.log(res);
      document.getElementById(id).remove();
    })
    .catch((err) => console.log(err));
}

function modifierT(id, id_employe) {
  fetch(`http://localhost/projetsr.php/taches/${id}`)
    .then((data) => data.json())
    .then((tache) => {
      document.getElementById("modal").style.display = "flex";
      document
        .getElementById("modifyform")
        .setAttribute("onsubmit", `modifierTache(event, ${id})`);
      document.getElementById("1description").value = tache.description;
      const select = document.getElementById("employe");
      const select1 = document.getElementById("1employe");
      console.log(select.options);
      let toAdd = "";
      for (const e of select.options) {
        if (e.innerText.startsWith(`${id_employe}. `)) {
          toAdd += `<option value="${id_employe}" selected>${e.innerText}</option>`;
        } else {
          toAdd += `${e.outerHTML}`;
        }
      }
      select1.innerHTML = toAdd;
    })
    .catch((err) => console.log(err));
}

function modifierTache(e, id) {
  e.preventDefault();
  const description = document.getElementById("1description").value;
  const select = document.getElementById("1employe");
  const employe = select.options[select.selectedIndex].value;
  const tache = {
    description,
    id_employe: employe,
  };
  fetch(`http://localhost/projetsr.php/taches/${id}`, {
    method: "PUT",
    mode: "cors",
    credentials: "same-origin",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tache),
  })
    .then((data) => data.json())
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => console.log(err));
}

function ajouterTache(e) {
  e.preventDefault();
  const description = document.getElementById("description").value;
  const select = document.getElementById("employe");
  const employe = select.options[select.selectedIndex].value;
  const tache = {
    description,
    id_employe: employe,
  };
  fetch("http://localhost/projetsr.php/taches/", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tache),
  })
    .then((data) => data.json())
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => console.log(err));
}
