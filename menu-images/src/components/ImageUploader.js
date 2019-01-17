import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 3px dotted #efefef;
  width: 100px;
  height: 100px;
  text-align: center;
  background: #fff;
  margin: 1rem 1rem 1rem 0;
  position: relative;
`;

const FileInput = styled.input`
  opacity: 0;
  width: 100px;
  height: 100px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
`;

const Text = styled.p`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
`;

class ImageUploader extends Component {
  state = {
    background: ''
  }

  uploadImage = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    
    reader.onloadend = () => {
      this.setState({
        file: file,
        background: reader.result
      });

      fetch(`http://localhost:3001/firebase/image-upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          file: this.state.background,
          fileName: file.name.split('.')[0]
        })
      })
      .then(res => res.json())
      .then(res => this.props.handleImage(res.imagePath))
      .catch(err => console.error('err', err.message));
    };

    reader.readAsDataURL(file);
    // send to localhost:3001/firebase/image-upload
    // should be req.file there (not sure how to do that yet. May need to send as multipart/form-data)
  }

  render() {
    return (
      <Container>
        <Text>Upload an Image</Text>
        <FileInput name="image" type="file" accept="images/*" onChange={(e) => this.uploadImage(e)} />
      </Container>
    )
  }
}

export default ImageUploader;