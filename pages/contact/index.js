
export default function ContactPage() {
  return (
    <div className="contactPage">
      <div className="container">
      <div class="AwesomeCommentSection">
        <div class="commentTitle">
          <h3>Wanna talk?</h3>
          <p>We Pleasure to listen you!</p>
        </div>
        <div class="commentContent">
          <div class="inputGroup">
            <input type="text" placeholder="Your Name*" />
          </div>
          <div class="inputGroup">
            <input type="email" placeholder="Your Email*" />
          </div>
          <div class="inputGroup">
            <textarea placeholder="Your Message*"></textarea>
          </div>
        </div>
        <div class="submitBtn">
          <button>Send</button>
        </div>
      </div>
      </div>

    </div>
  )
}
