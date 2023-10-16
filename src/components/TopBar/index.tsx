import React, { useState } from 'react';

import { Avatar, Box, Typography, Grid, MenuItem, IconButton, Menu } from '@mui/material';

const userMenuOptions = ['Mi perfil', 'Cerrar sesión'];

import { AppBarMui, ToolbarMui, ButtonSignUp, ButtonLogIn, ButtonBox } from './styles';

interface TopBarProps {
  isAuthenticated: boolean;
}

export const TopBar = (props: TopBarProps) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBarMui>
          <ToolbarMui disableGutters>
            {/* To do: Add logo and remove Typography*/}
            <Box>
              <Typography>LOGO</Typography>
            </Box>
            {props.isAuthenticated ? (
              <Box>
                {/* To do: add user picture */}
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar src="/static/images/avatar/2.jpg" />
                </IconButton>
                {/* User menu */}
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  {userMenuOptions.map(setting => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <ButtonBox>
                {/* To do: add on click navigation */}
                <ButtonLogIn size="medium">Iniciar sesión</ButtonLogIn>
                <ButtonSignUp size="medium" variant="outlined">
                  Crear cuenta
                </ButtonSignUp>
              </ButtonBox>
            )}
          </ToolbarMui>
        </AppBarMui>
      </Grid>
    </Grid>
  );
};
