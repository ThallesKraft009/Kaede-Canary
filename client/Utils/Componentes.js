async function Button(data){
  data.type = 1;
  return data;
}

async function selectmenu(data){
  data.type = 3;
  return data;
}

async function componente(data){

  let array = {
    type: 1,
    components: [
      data
    ]
  }

  return array;
}

module.exports = {
  Button,
  selectmenu,
  componente
}