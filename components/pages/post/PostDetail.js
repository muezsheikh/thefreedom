import React from 'react'
import PageLayout from '../home/PageLayout'

export default function PostDetail() {
  return (
    <PageLayout>
      <div className="postDetailPage">
        <div className="image">
          <img src="https://thefreedom.com.pk/wp-content/uploads/2023/07/0ba11419-1135-4189-8747-73de4a211354-800x445.jpeg" alt="" />
        </div>
        <div className="title">
          <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, magnam laboriosam! In excepturi veniam nemo.</h1>
        </div>
        <div className="content">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, fugit dicta! Voluptate sed, natus, aut et tenetur illo dolorem provident delectus in doloribus error! Praesentium voluptatibus aliquid corporis voluptas totam dolores ratione sunt, accusamus nesciunt iusto eos quae repudiandae reprehenderit temporibus maxime rem aspernatur beatae culpa quam cupiditate sequi vel modi eius! Eaque totam et molestias ut unde aut debitis voluptate suscipit soluta magni veritatis est ipsam, culpa nihil explicabo, harum eveniet quidem odio accusantium! Fuga dignissimos aspernatur est ipsum sunt eligendi eius? Voluptas mollitia quidem at vel fuga, alias modi nulla temporibus animi aliquam nisi accusamus explicabo odio ullam quos ipsum. Et, numquam hic doloribus consequuntur quibusdam commodi ipsum a vero, accusamus necessitatibus tenetur blanditiis? Repudiandae quidem soluta odit animi quaerat. Unde obcaecati, ducimus repudiandae fuga voluptate laudantium harum assumenda delectus error laborum consequatur tenetur eaque accusamus quisquam aperiam sint quis numquam quaerat labore adipisci at. Est suscipit repellendus iusto illum excepturi quia magnam recusandae ab blanditiis voluptas error praesentium magni laborum sed neque, eligendi nesciunt, optio commodi nemo. Ea voluptatem pariatur nisi debitis minus odio molestiae nam. Praesentium nobis quasi assumenda repellat repellendus laboriosam rem labore adipisci, fugiat modi vero doloremque illo ex quis placeat facere recusandae, ipsam aliquid numquam! Vero neque quasi id tempore illo illum et harum. Veniam repudiandae officia maxime nemo quaerat perferendis nam doloribus aliquam, id accusamus beatae suscipit illum ad saepe totam nesciunt officiis aliquid, soluta quod earum hic. Tempora expedita nihil ducimus. Nisi, commodi doloremque fuga repellendus, pariatur reprehenderit consectetur neque, eveniet voluptas harum dolores alias qui voluptate consequatur ea ipsa ad. Et tempore deserunt inventore ut iste doloribus totam ullam officia earum itaque rem vel exercitationem, maxime quod, dignissimos, ad autem fuga. Dolorem beatae praesentium labore deleniti totam quia ipsa voluptas ab error, modi corrupti molestias, libero, accusamus amet dignissimos quam excepturi voluptatibus similique non. Error beatae quidem accusamus itaque culpa dignissimos quasi, est reiciendis cumque doloremque, assumenda maiores! Itaque ipsam officiis labore pariatur, quidem numquam incidunt accusantium, voluptate id enim laborum impedit natus velit distinctio molestias. Voluptatum, quia! Expedita repellat delectus praesentium quisquam sit dolor id omnis saepe ad, officiis incidunt iste accusantium alias impedit accusamus cumque quibusdam! Quo error voluptates reiciendis eos obcaecati at ducimus, odio iure dolorum ipsum accusamus consectetur id tenetur suscipit doloribus adipisci cupiditate saepe, quam aperiam accusantium ab molestias eius commodi et! Voluptas ipsa quam nesciunt assumenda omnis reprehenderit quis tempore asperiores rerum suscipit est, enim saepe id in recusandae necessitatibus quaerat pariatur vero officiis explicabo. Quidem totam saepe quas dolorum. Nulla facilis labore, quibusdam illum sint itaque fugiat soluta veniam delectus nobis pariatur non natus. Eveniet suscipit veniam numquam, distinctio ipsam hic architecto fuga beatae blanditiis nulla? Unde itaque nesciunt omnis non in? Necessitatibus temporibus non porro quas sint sapiente animi amet earum dolorem, in fugiat? Animi maiores, expedita ea deleniti minus tempore cupiditate voluptate consectetur non ipsam, sint voluptatem magni modi perspiciatis fugiat ipsa eius eaque! Qui dolorem, commodi placeat maxime repudiandae magnam accusamus magni pariatur enim molestiae in quo quibusdam doloribus modi!</p>
        </div>
      </div>
      <div className="commentsSection">
        <div className="title">
          <h3>Comments 3</h3>
        </div>
        <div className="comments">
          <div className="comment">
            <div className="commentContent">
              <h3>John Cena</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, corporis?</p>
              <div className="date">
                <p className="date">November 23, 2019</p>
                <button>Reply</button>
              </div>
            </div>
          </div>
          <div className="comment">
            <div className="commentContent">
              <h3>John Cena</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, corporis?</p>
              <div className="date">
                <p className="date">November 23, 2019</p>
                <button>Reply</button>
              </div>
            </div>
          </div>
          <div className="comment">
            <div className="commentContent">
              <h3>John Cena</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, corporis?</p>
              <div className="date">
                <p className="date">November 23, 2019</p>
                <button>Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="AwesomeCommentSection">
        <div class="commentTitle">
          <h3>Join the Conversation</h3>
          <p>Your thoughts matter! Share them with us below.</p>
          <p class="note">Note: Your email address will not be published. Required fields are marked*</p>
        </div>
        <div class="commentContent">
          <div class="inputGroup">
            <input type="text" placeholder="Your Name*" />
          </div>
          <div class="inputGroup">
            <input type="email" placeholder="Your Email*" />
          </div>
          <div class="inputGroup">
            <textarea placeholder="Your Amazing Comment*"></textarea>
          </div>
        </div>
        <div class="submitBtn">
          <button>Post Your Thoughts</button>
        </div>
      </div>



    </PageLayout>
  )
}
