import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Header } from './Header';
import { Footer } from './Footer.js';
import Box from '@mui/material/Box';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
        <Header />
        <Container>
          {this.props.children}
            </Container>
            <Box sx={{mt: 'auto'}}>
                <Footer />
            </Box>
      </Box>
    );
  }
}
