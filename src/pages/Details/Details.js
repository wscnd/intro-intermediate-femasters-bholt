import PropTypes from "prop-types";
import pet from "@frontendmasters/pet";
import { Link, navigate } from "@reach/router";
import React, { lazy } from "react";
import DetailsErrorBoundary from "~/pages/Details/components/DetailsErrorBoundary";
import DisplayPet from "~/pages/Details/DisplayPet";
import { connect } from "react-redux";

const Modal = lazy(() => import("~/components/Modal"));

class Details extends React.Component {
  state = { loading: true, showModal: false };

  componentDidMount() {
    pet.animal(this.props?.id).then(({ animal }) => {
      animal
        ? this.setState({
            name: animal.name,
            animal: animal.type,
            location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
            description: animal.description,
            media: animal?.photos,
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

    /* eslint-disable no-unused-vars */
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
      <DisplayPet state={this.state}>
        <button
          onClick={this.toggleModal}
          style={{ backgroundColor: this.props.theme }}
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

        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {name}</h1>
              <div className="buttons">
                <button
                  style={{ backgroundColor: this.state.theme }}
                  onClick={this.adopt}
                >
                  Yes
                </button>
                <button
                  style={{ backgroundColor: this.state.theme }}
                  onClick={this.toggleModal}
                >
                  No I`m a monster
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </DisplayPet>
    );
  }
}

const mapStateToProps = ({ theme }) => ({ theme });

const WrappedDetails = connect(mapStateToProps)(Details);

export default function DetailsWithErroBoundary(props) {
  return (
    <DetailsErrorBoundary>
      <WrappedDetails {...props} />
    </DetailsErrorBoundary>
  );
}
