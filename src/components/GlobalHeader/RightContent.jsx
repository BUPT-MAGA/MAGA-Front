import { Tooltip, Tag } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { connect, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = (props) => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="Site Search"
        defaultValue="BUPT MAGA"
        options={[
          {
            label: <a href="https://github.com/BUPT-MAGA">BUPT MAGA</a>,
            value: 'BUPT MAGA',
          },
          {
            label: <a href="/settings">Settings</a>,
            value: 'Settings',
          },
          {
            label: <a href="/manage">Manage</a>,
            value: 'Manage',
          },
          {
            label: <a href="/statistics/room">Room report</a>,
            value: 'Room report',
          },
        ]}
        onSearch={(value) => {
          console.log('input:', value);
          const url = `https://github.com/BUPT-MAGA?q=${value}`;
          let win = window.open(url, '_blank');
          win.focus();
        }}
      />
      <Tooltip title="Use documentation">
        <a
          style={{
            color: 'inherit',
          }}
          target="_blank"
          href="http://123.60.215.79:8000/docs"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>
      <Avatar />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      <SelectLang className={styles.action} />
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
