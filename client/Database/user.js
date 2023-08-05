const { Schema, model } = require("mongoose");

const userset = new Schema({
  userID: { type: String },
  premium: { type: Boolean, default: false },
  lingua: { type: String, default: "pt" },

  perfil: {
    sobremim: { type: String, default: `Use /perfil sobremim pra alterar seu sobremim`}
  },

  
blacklist: {
    banido: { type: Boolean, defaut: false },
    motivo: { type: String, defaut: "Não definido" },
    staff: { type: String, defaut: 'sumido#000'},
  },

  economia: {
    money: { type: Number, default: 0 },
    banco: { type: Number, default: 0 },
    daily: { type: Number, default: 0 },
    roubo: { type: Number, default: 0 }
  },
             
});


module.exports = model("Kaede-Users", userset);