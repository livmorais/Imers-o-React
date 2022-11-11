import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js"

// Whiteboarding
// Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

const PROJECT_URL = "https://focbordcvalhhaantyng.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvY2JvcmRjdmFsaGhhYW50eW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTQzMTEsImV4cCI6MTk4Mzc3MDMxMX0.4htpWeTYDOg9LDWgrTG6MDJ4JGe1BZDorKnaxWrRdWI";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

// get youtube thumbnail from video url
function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Frost punk", url: "https://youtube.." }
    });
    const [formVisivel, setFormVisivel] = React.useState(true);

    /*
    ## O que precisamos para o form funcionar?
    - pegar os dados, que precisam vir do state
        - titulo
        - url do vídeo 
    - precisamos ter um onSubmit do nosso form
    - Limpar o formulário após o Submit
    */

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* Ternário */}
            {/* Operadores de Curto-circuito */}
            {formVisivel
            ? (
            <form onSubmit={(evento) => {
                evento.preventDefault();
                console.log(formCadastro.values);

                supabase.from("video").insert({
                    title: formCadastro.values.titulo,
                    url: formCadastro.values.url,
                    thumb: getThumbnail(formCadastro.values.url),
                    playlist: "jogos",
                })
                .then((oqueveio) => {
                   console.log(oqueveio);
                })
                .catch((err) => {
                   console.log(err);
                })
                setFormVisivel(false);
                formCadastro.clearForm();
            }}>
                <div>
                <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                    X
                </button>
                <input placeholder="Título do vídeo" 
                name="titulo"
                value={formCadastro.values.titulo}
                onChange={formCadastro.handleChange}
                ></input>
                <input placeholder="URL"
                name="url"
                value={formCadastro.values.url}
                onChange={formCadastro.handleChange}
                ></input>
                <button type="submit">
                    Cadastrar
                </button>

                </div>
            </form>

            ) : false}
        </StyledRegisterVideo>
    )
}