import { Dropdown, Input, message, Space, type MenuProps } from 'antd'
import {
  DownOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  StarOutlined,
} from '@ant-design/icons'
import './search.css'
import {
  fetchCharacters,
  selectCharacterDetails,
  setQuery,
  toggleFavorite,
} from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../redux/hooks'
import { useRef } from 'react'

function Search() {
  const dispatch = useDispatch()
  const characterIds = useTypedSelector((state) => state.selectedCharacters)
  const query = useTypedSelector((state) => state.query)
  const prevQuery = useRef<string>('')

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
          dispatch(setQuery(e.target.value))

          if (e.target.value.length === 0) {
            dispatch(fetchCharacters())
          }
        }}
        placeholder="Search in this group"
      />
      <SearchOutlined
        className="search-icon"
        onClick={() => {
          if (!query || query.length === 0) {
            message.warning('Please enter a search term')
            return
          }

          if (query === prevQuery.current) {
            message.info('You are already searching for this term')
            return
          }

          dispatch(fetchCharacters(query))
          prevQuery.current = query
        }}
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
