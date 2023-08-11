import { useRouter } from 'next/router';
import { Menu, MenuItem, Divider, Tooltip } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const languages = [
  {
    code: 'en',
    name: 'EN',
  },
  {
    code: 'fr',
    name: 'FR',
  },
  {
    code: 'ar',
    name: 'AR',
  },
];

const ChangeLanguage = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;
  const { t } = useTranslation(['common']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick: any = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (language: string) => {
    console.table({ locale, pathname, asPath, language });
    //router.push({ pathname }, asPath, {
    //  locale: language,
    //});
    // push to home page with the new language
    router.push({ pathname: '/', query }, '/', {
      locale: language,
    });
  };

  return (
    <div className="ml-2">
      <Tooltip title={t('translation_button')}>
        <button
          className="w-10 text-light-dark-4 text-base font-medium uppercase"
          onClick={handleClick}
        >
          {locale}
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
        {languages
          .filter((language) => language.code !== locale)
          .map((language) => (
            <MenuItem key={language.code}>
              <button
                className="text-light-dark-4 text-base font-medium"
                onClick={() => handleChangeLanguage(language.code)}
              >
                {language.name}
              </button>
            </MenuItem>
          ))}
        <Divider />
      </Menu>
    </div>
  );
};

export default ChangeLanguage;
