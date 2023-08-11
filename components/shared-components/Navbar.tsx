import dynamic from 'next/dynamic';
import { MouseEvent, useEffect, useState } from 'react';
import { navBarLinks } from '@/data/navbarData';
import { useSession } from 'next-auth/react';
import { Menu, MenuItem, Tooltip } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTranslation } from 'next-i18next';
const Logo = dynamic(() => import('./Logo'));
const Link = dynamic(() => import('next/link'));

const LinksDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation('baseNavbar');

  const handleClick: any = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title={t('account-parameters')}>
        <button
          className="h-10 w-10 p-[7px] rounded-full text-light-dark-4 flex items-center justify-center"
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            bgcolor: '#282828',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 18,
              width: 10,
              height: 10,
              bgcolor: '#282828',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {navBarLinks.map((link, index) => (
          <MenuItem key={index}>
            <Link
              href={link.href}
              prefetch={false}
              className="text-light-dark-4 text-base font-medium"
            >
              {t(link.name)}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

const Navbar = () => {
  let { data: session, status } = useSession();

  const [links, setLinks] = useState<number>(0);
  const { t } = useTranslation('baseNavbar');

  // create event listener that changes the state variables depending on the page resolution
  const handleResize = () => {
    if (window.innerWidth > 1100) {
      setLinks(3);
    } else {
      setLinks(0);
    }
  };

  // add event listener to the window object
  typeof window !== 'undefined' &&
    window.addEventListener('resize', handleResize);

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <nav className="w-[95%] mx-auto flex items-center justify-between pt-6 font-semibold overflow-x-hidden">
      <div className="w-[35%] flex items-center justify-between lg:w-[50%]">
        <Logo />

        {navBarLinks.slice(0, links).map((link, index) => (
          <Link
            key={index}
            href={link.href}
            prefetch={false}
            className="font-medium"
          >
            {t(link.name)}
          </Link>
        ))}
        {links === 0 && <LinksDropdown />}
      </div>
      {
        // if the user is logged in, display the dashboard link
        session ? (
          <Link
            href="/dashboard"
            passHref
            className="flex items-center justify-center text-dark font-medium bg-primary rounded w-24 h-8 text-sm hover:bg-primary hover:bg-opacity-90 md:text-[16px] md:w-36 md:h-10 hover:cursor-pointer"
          >
            {t('myaccount')}
          </Link>
        ) : (
          <div className="w-[45%] flex items-center justify-between ml-auto sm:w-[35%] md:w-[40%] lg:w-[30%] max-w-[300px] min-w-[210px]">
            <Link href="/login" prefetch passHref>
              <button className="capitalize text-primary font-medium rounded w-28 mr-auto h-8 text-sm bg-blue-light hover:bg-blue-light hover:bg-opacity-80 md:text-[16px] md:mr-3 md:h-10 md:w-36">
                {t('connect')}
              </button>
            </Link>

            <Link href="/register" prefetch passHref>
              <button className="capitalize text-dark font-medium bg-primary rounded w-24 h-8 text-sm hover:bg-primary hover:bg-opacity-90 md:text-[16px] md:w-36 md:h-10">
                {t('register')}
              </button>
            </Link>
          </div>
        )
      }
    </nav>
  );
};

export default Navbar;
