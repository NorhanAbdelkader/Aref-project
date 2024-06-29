import './rating-bar.css'
export default function RatingBar(props){
  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${parseInt(props.rateValue, 10)}%` }}
      ></div>
    </div>
  );

}