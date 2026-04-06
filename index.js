const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

const estudiantes  = [
    {id: 1, nombre: "Jhonner", apellido: "Moreno", edad: 26, rol: true},
    {id: 2, nombre: "Camilo", apellido: "Joya", edad: 26, rol: true},
    {id: 3, nombre: "Sebastian", apellido: "Joya", edad: 26, rol: false},
]

app.get ("/", (req, res) =>{
    res.send("jhonner");
});

app. get("/api/estudiantes", (req, res)=>{
    res.send(estudiantes);
});

//Buscar estudiante por ID//

app.get("/api/estudiantes/:id", (req,res)=>{
    const estudiante = estudiantes.find(c => c.id === parseInt(req.params.id));
    if (!estudiante) return res.status(404).send("Estudiante no encontrado");
    else res.send(estudiante)
})

//Crear estudiante
app.post ("/api/estudiantes", (req, res) =>{
    const estudiante = {
        id: estudiantes.length +1,
        name: req.body.nombre,
        apellido: req.body.apellido,
        edad: parseInt(req.body.edad),
        rol: (req.body.rol === "true")
    };

    estudiantes.push(estudiante);
    res.send(estudiante)
});

// Eliminar estudiante

app.delete("/api/estudiantes/:id", (req, res) => {
    const estudiante = estudiantes.find(c => c.id === parseInt(req.params.id));
    if (!estudiante) return res.status(404).send("El estudiante no se encuentra");

    const index = estudiantes.indexOf(estudiante);
    estudiantes.splice(index, 1);
    res.send(estudiante);
});

const port = process.env.port || 80;
app.listen(port, () => console.log("Escuchando en el puerto", port));


