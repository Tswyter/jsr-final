import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 3px dotted #efefef;
  width: 100px;
  height: 100px;
  text-align: center;
  margin: 1rem 1rem 1rem 0;
  background: #fff;
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

  }

  uploadImage = (e) => {
    console.log(e.target.files);
    // send to localhost:3001/firebase/upload-image
    // should be req.file there (not sure how to do that yet. May need to send as multipart/form-data)
  }

  render() {
    return (
      <Container>
        <Text>Upload an Image</Text>
        <FileInput type="file" accept="images/*" onChange={(e) => this.uploadImage(e)} />
      </Container>
    )
  }
}

export default ImageUploader;