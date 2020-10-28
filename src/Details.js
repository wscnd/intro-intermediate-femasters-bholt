import React from "react";
import pet from "@frontendmasters/pet";
import { Link, navigate } from "@reach/router";
import Carousel from "./Carousel";
import ThemeContext from "./ThemeContext";
import ErrorBoundary from "./ErroBoundary";
import Modal from "./Modal";

class Details extends React.Component {
  state = { loading: true, showModal: false };

  componentDidMount() {
    pet.animal(this.props.id).then(({ animal }) => {
      animal
        ? this.setState({
            name: animal.name,
            animal: animal.type,
            location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
            description: animal.description,
            media: animal.photos,
            breed: animal.breeds.primary,
            url: animal.url,
            loading: false,
          })
        : this.setState({
            error: true,
            loading: false,
          });
    }, console.error);
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url);
  render() {
    if (this.state.loading) {
      return (
        <div className="details">
          <h1>loading ...</h1>
        </div>
      );
    }

    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h1>{`${animal}, ${breed}, ${location}`}</h1>
          <ThemeContext.Consumer>
            {([theme]) => (
              <>
                <button
                  onClick={this.toggleModal}
                  style={{ backgroundColor: theme }}
                >
                  Adopt {name}
                </button>
                <Link
                  to="/"
                  state={{
                    animal: animal,
                    breed: breed,
                  }}
                >
                  <button>Go back HOME</button>
                </Link>
              </>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}</h1>
                <div className="buttons">
                  <ThemeContext.Consumer>
                    {([theme]) => (
                      <>
                        <button
                          style={{ backgroundColor: theme }}
                          onClick={this.adopt}
                        >
                          Yes
                        </button>
                        <button
                          style={{ backgroundColor: theme }}
                          onClick={this.toggleModal}
                        >
                          No I`m a monster
                        </button>
                      </>
                    )}
                  </ThemeContext.Consumer>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function DetailsWithErroBoundary(props) {
  return (
    <ErrorBoundary>
      {" "}
      <Details {...props} />
    </ErrorBoundary>
  );
}
