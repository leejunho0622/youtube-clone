window.onload = () => {
    const REST_API_KEY = "da8ac3dc484fc0e6608d0f01577c981b";
    const searching = document.querySelector("#btn-search");

    const prev = document.querySelector("#prev");
    const next = document.querySelector("#next");
    
    let page = 1;
    let cash;

    function search() {
        const value = document.getElementById("search").value;
        if(page === 1){
            cash = value;
        } else {
            if(value !== cash)
                page = 1;
        }

        document.getElementById("prev").style.display = "none";
        document.getElementById("next").style.display = "none";
        document.getElementById("shorts").style.display = "none";
        const innerShortsContent1 = document.getElementById("s-content-list-1");
        const innerShortsContent2 = document.getElementById("s-content-list-2");
        const innerMainContent = document.getElementById("m-content-list");
        innerShortsContent1.innerHTML = "";
        innerShortsContent2.innerHTML = "";
        innerMainContent.innerHTML = "";

        const fetchWebData = async () => {
            const result = await fetch(`https://dapi.kakao.com/v2/search/vclip?query=${value}&page=${page}&size=10`, {
                method: "GET",
                headers: {
                    "Authorization": `KakaoAK ${REST_API_KEY}`
                }
            });
            const body = await result.json();

            document.getElementById("prev").style.display = "flex";
            document.getElementById("next").style.display = "flex";

            let count = 0;
            const length = body.documents.length;
            for(i=0; i<length; i++){
                const content = body.documents[i];
                const urlCode = content.url.split('=')[1];
                const isShorts = content.title.search(/shorts/i);
                if(isShorts !== -1){
                    document.getElementById("shorts").style.display = "block";
                    if(count < 5){
                        innerShortsContent1.innerHTML += `
                        <li>
                            <div>
                                <iframe src="https://www.youtube.com/embed/${urlCode}" alt="test${i}"></iframe>
                                <p><h5>${content.title}</h5>${content.author}</p>
                            </div>
                        </li>
                        `;
                        count++;
                    } else {
                        innerShortsContent2.innerHTML += `
                        <li>
                            <div>
                                <iframe src="https://www.youtube.com/embed/${urlCode}" alt="test${i}"></iframe>
                                <p><h5>${content.title}</h5>${content.author}</p>
                            </div>
                        </li>
                        `;  
                    }
                }else {
                    innerMainContent.innerHTML += `
                    <li>
                        <iframe src="https://www.youtube.com/embed/${urlCode}" alt="test${i}"></iframe>
                        <div><p><h3>${content.title}</h3><br>${content.author}</p></div>
                    </li>
                    `;
                }
            }
        }
        fetchWebData();
    }

    prev.addEventListener("click", e => {
        if(page > 1){
            page--;
            search();
        }
    });

    next.addEventListener("click", e => {
        if(page < 15){
            page++;
            search();
        }
    });

    searching.addEventListener("click", e => {
        search();
    });

    window.addEventListener("click", e => {
        const target = e.target;
        if(target.id === "logo"){
            document.getElementById("prev").style.display = "none";
            document.getElementById("next").style.display = "none";
            document.getElementById("shorts").style.display = "none";
            const innerShortsContent1 = document.getElementById("s-content-list-1");
            const innerShortsContent2 = document.getElementById("s-content-list-2");
            const innerMainContent = document.getElementById("m-content-list");
            innerShortsContent1.innerHTML = "";
            innerShortsContent2.innerHTML = "";
            innerMainContent.innerHTML = "";
            page = 1;
        }
    });
}
