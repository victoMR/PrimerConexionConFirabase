var ruta = require("express").Router(); //variable de ruta
var {mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarPorID, borrarUsuario}=require("../database/usuariosBD");

//PRINCIPAL
ruta.get("/", async (req,res)=>{ //req y res las declaramos aqui, see pueden llamar distinto
 var usuarios= await mostrarUsuarios();
  res.render("usuarios/mostrar",{usuarios});
})
// NUEVO USR
ruta.get("/nuevousuario", async (req,res)=>{
  res.render("usuarios/nuevoUsr");
})
ruta.post("/nuevousuario", async (req,res)=>{
  var error= await nuevoUsuario(req.body);
  res.redirect("/");
})
// EDITAR
ruta.get("/editar/:id", async (req,res)=>{
  var usuario= await buscarPorID(req.params.id);
  res.render("usuarios/modificarUsr",{usuario});
})
ruta.post("/editar", async (req,res)=>{
  var error= await modificarUsuario(req.body);
  res.redirect("/");
})
// ELIMINAR
ruta.get("/borrar/:id", async (req,res)=>{
  var usuario= await buscarPorID(req.params.id);
  res.render("usuarios/eliminarUsr",{usuario});
})
ruta.post("/borrar", async (req,res)=>{
  await borrarUsuario(req.body.id);
  res.redirect("/");
})
module.exports = ruta;