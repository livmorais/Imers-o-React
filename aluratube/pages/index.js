import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
    const estilosDaHomePage = {
         
    };
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists} favoritos={config.favoritos}>
                    Conteúdo
                </Timeline>
            </div>
        </>
    );
}

export default HomePage

// function Menu() {
//     return (
//         <div>
//             Menu
//         </div>
//     )
// }


const StyledHeader = styled.div`
    .user-photo {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
    /* .banner {
        width: 100%;
        object-fit: fill;
        height: 20rem;
    } */

    
`;

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ banner }) => banner});
    /* background-image: url(${config.bg}); */
    height: 230px;
`;

function Header() {
    return (
        <StyledHeader>
        <StyledBanner banner={config.banner} />
                {/* <img className="banner" src={config.banner}/> */}
            <section className="user-info">
                <img className="user-photo" src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({searchValue, ...propriedades}) {
    const playlistNames = Object.keys(propriedades.playlists);
    // Statement
    // Retorno por expressão
    const favoritoNames = Object.keys(propriedades.favoritos);
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName];
                // console.log(playlistName);
                // console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            })
                            .map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>

                    </section>
                )
            })}
            {favoritoNames.map((favoritoName) => {
                const youtubers = propriedades.favoritos[favoritoName];
                // console.log(favoritoName);
                // console.log(youtubers);
                return (
                    <section key={favoritoName}>
                        <h2>AluraTubes Favoritos</h2>
                        <div className="favoritos">
                            {youtubers.filter((youtuber) => {
                                const titleNormalized = youtuber.name.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)   
                            })
                            .map((youtuber) => {
                                return (
                                    <>
                                    <ul className="favorito">
                                       <img src={youtuber.photo}/>
                                    <a key={youtuber.url} href={youtuber.url}>
                                        {youtuber.name}
                                    </a>
                                    </ul>
                                    </>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}