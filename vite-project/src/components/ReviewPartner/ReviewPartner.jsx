import React from "react";
import Row from "react-bootstrap/Row";

const ReviewPartner = ({ hotels }) => {
  return (
    <div>
      <section>
        <Row xs={1} sm={2} lg={3} className="g-2">
          {hotels?.map((unHotel) => (
            <div key={unHotel.name}>
              <h2>{unHotel.name}</h2>
              {unHotel.Reviews?.map((rev) => (
                <div key={rev.username}>
                  <h3>{rev.username}</h3>
                  <p>{rev.review}</p>
                  <p>{rev.punctuation}</p>
                </div>
              ))}
            </div>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default ReviewPartner;