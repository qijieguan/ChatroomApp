import health_img from './images/health.png';
import education_img from './images/education.jpg';
import technology_img from './images/technology.jpg';
import food_img from './images/food.jpg';
import sports_img from './images/sports.jpg';
import dating_img from './images/dating.jpg';


const Category = () => {
    return (
        <div className="category-ul" style={{width: '90%', marginLeft: '5%'}}>
            <div className="category-li" style={Object.assign({backgroundImage: `url(${health_img})`}, imageBoxStyle)}>
                <input className='category-input' type="checkbox" id="health" name="health" value="health"/>
            </div>
            <div className="category-li" style={Object.assign({backgroundImage: `url(${education_img})`}, imageBoxStyle)}>
                <input className='category-input' type="checkbox" id="education" name="education" value="education"/>
            </div>
            <div className="category-li" style={Object.assign({backgroundImage: `url(${technology_img})`}, imageBoxStyle)}>
                <input className='category-input' type="checkbox" id="technology" name="technology" value="technology"/>
            </div>
            <div className="category-li" style={Object.assign({backgroundImage: `url(${food_img})`}, imageBoxStyle)}>
                <input className='category-input' type="checkbox" id="food" name="food" value="food"/>
            </div>
            <div className="category-li" style={Object.assign({backgroundImage: `url(${sports_img})`}, imageBoxStyle)}>
                <input className='category-input' type="checkbox" id="sports" name="sports" value="sports"/>
            </div>
            <div className="category-li" style={Object.assign({backgroundImage: `url(${dating_img})`}, imageBoxStyle)}>
                <input className='category-input' type="checkbox" id="dating" name="dating" value="dating"/>
            </div>
        </div>
    );
}

const imageBoxStyle = {
    display: 'inline-block',
    float: 'left',
    margin: '20px 15px 10px 0',
    width: '47%', 
    height: '250px', 
    color: 'black', 
    backgroundSize: 'fit', 
    backgroundPosition: 'center',
    borderRadius: '2px'
}

export default Category;