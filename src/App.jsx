import {useState, useEffect} from "react";
import Carousel from "./components/Carousel";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [selectedUrls, setSelectedUrls] = useState([]);

 useEffect(() => {
   fetch("https://picsum.photos/v2/list?page=1&limit=30")
     .then((res) => res.json())
     .then((data) => {
       const formatted = data.map((item) => ({
         id: item.id,
         url: `https://picsum.photos/id/${item.id}/600/400`,
       }));
       setImages(formatted);
     })
     .catch((err) => console.error("Помилка завантаження:", err));
 }, []);

  const handleSelect = (url) => {
    setSelectedUrls(prev =>
      prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]
    );
  };

  return (
    <div className="container">
      <h1 className="title">Images</h1>
      <Carousel
        images={images}
        onSelect={handleSelect}
        selectUrls={selectedUrls}
      />
      
      <div className="selection-info">
        <h3>Selected URLs:</h3>
        <div className="urls-list">
          {selectedUrls.map((url, i) => (
            <p key={i} className="url-tag">{url}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;