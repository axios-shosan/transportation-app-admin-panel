import dynamic from 'next/dynamic';
import { MouseEvent, useEffect, useState } from 'react';
const AvatarIcon = dynamic(() =>
  import('@/components/icons/navbarIcons').then((mod) => mod.AvatarIcon)
);
const Logo = dynamic(() => import('@/components/shared-components/Logo'));
import { Menu, MenuItem, Divider, Tooltip } from '@mui/material';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { EnterpriseRes } from '@/interfaces/enterprise';
import { useMyEnterpriseMutation } from '@/redux/api/apiSlice';
import { toast } from 'react-toastify';
import ChangeLanguage from '@/components/shared-components/ChangeLanguage';
import { useTranslation } from 'next-i18next';

const Navbar = () => {
  const [myEnterprise, { isLoading }] = useMyEnterpriseMutation();
  const { t } = useTranslation(['dashboardNavbar', 'common']);
  const [enterprise, setEnterprise] = useState<EnterpriseRes>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick: any = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    myEnterprise(null)
      .unwrap()
      .then((res) => {
        setEnterprise(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.data);
      });

    return () => {};
  }, []);

  return (
    <nav className="w-[95%] mx-auto flex items-center justify-between pt-6 font-semibold overflow-auto">
      <div className="w-[50%] flex items-center justify-between">
        <Logo />
      </div>
      <div className="flex items-center justify-between ml-auto">
        <p className="text-light-dark-4 text-sm font-medium mr-3 sm:text-base">
          {t('hello')}, {enterprise?.name}
        </p>
        <div>
          <Tooltip title={t('account-parameters')}>
            <button
              className="h-10 w-10 p-[7px] rounded-full bg-light-dark-2 flex items-center justify-center"
              onClick={handleClick}
            >
              <AvatarIcon />
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
            <MenuItem>
              <Link
                href="/dashboard/edit-profile"
                prefetch={false}
                className="text-light-dark-4 text-base font-medium"
              >
                {t('edit-profile')}
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href=""
                prefetch={false}
                className="text-light-dark-4 text-base font-medium"
              >
                {t('need-help')}
              </Link>
            </MenuItem>
            <Divider />

            <MenuItem
              className="w-[90%] flex items-center justify-between !text-red-500 text-base"
              onClick={() => {
                signOut({ callbackUrl: `/` });
              }}
            >
              {t('signout')}
            </MenuItem>
          </Menu>
        </div>
        {/* Translation Button */}
        <ChangeLanguage />
      </div>
    </nav>
  );
};

export default Navbar;
