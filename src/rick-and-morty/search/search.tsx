import { Dropdown, Input, message, Space, type MenuProps } from 'antd'
import {
  DownOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  StarOutlined,
} from '@ant-design/icons'
import './search.css'
import {
  searchCharacters,
  selectCharacterDetails,
  setSearchCharacters,
  toggleFavorite,
} from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useTypedSelector } from '../../redux/hooks'

function Search() {
  const dispatch = useDispatch()
  const characterIds = useTypedSelector((state) => state.selectedCharacters)

  const [searchText, setSearchText] = useState('')

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <StarOutlined />,
      label: 'Revert selected favorites',
      disabled: characterIds.length === 0,
      onClick: () => {
        message.info('Reverting selected favorites')
        dispatch(toggleFavorite(characterIds))
      },
    },
    ...(characterIds.length === 1
      ? [
          {
            key: '2',
            icon: <InfoCircleOutlined />,
            label: 'Details',
            onClick: () => {
              dispatch(selectCharacterDetails(characterIds[0]))
            },
          },
        ]
      : []),
  ]

  return (
    <div className="search-container">
      <Input
        onChange={(e) => {
          if (e.target.value.length > 0) {
            setSearchText(e.target.value)
          } else {
            dispatch(setSearchCharacters([]))
          }
        }}
        placeholder="Search in this group"
      />
      <SearchOutlined
        className="search-icon"
        onClick={() => dispatch(searchCharacters(searchText))}
      />
      <Dropdown menu={{ items }} trigger={['click']}>
        <Space className="actions">
          Actions
          <DownOutlined />
        </Space>
      </Dropdown>
    </div>
  )
}

export default Search
