import { Checkbox, Dropdown, message, Spin, Table } from 'antd'
import type { MenuProps, TableProps } from 'antd'
import { InfoCircleOutlined, StarTwoTone } from '@ant-design/icons'
import './characters-table.css'
import { useDispatch } from 'react-redux'
import {
  fetchCharacters,
  selectCharacterDetails,
  selectCharacters,
  toggleFavorite,
} from '../../redux/actions'
import type { Character } from '../interfaces'
import { useTypedSelector } from '../../redux/hooks'

function CharactersTable() {
  const dispatch = useDispatch()

  const { characters, query, favorites, selectedCharacters, isLoading } =
    useTypedSelector((state) => state)

  const handleToggleFavorite = (characterId: number) => {
    const character = characters?.results?.find((c) => c.id === characterId)

    if (favorites.includes(characterId)) {
      message.success(`Removing ${character?.name} from favorites`)
    } else {
      message.success(`Adding ${character?.name} to favorites`)
    }

    dispatch(toggleFavorite([characterId]))
  }

  const columns: TableProps<Character>['columns'] = [
    {
      title: (
        <div className="not-centered">
          <Checkbox
            checked={
              characters?.results?.every((c) =>
                selectedCharacters.includes(c.id)
              ) ?? false
            }
            onChange={() => {
              dispatch(
                selectCharacters(characters?.results?.map((c) => c.id) ?? [])
              )
            }}
          />
          <span>ID</span>
        </div>
      ),
      dataIndex: 'id',
      key: 'id',
      render: (id, record) => (
        <div className="centered">
          <Checkbox
            defaultChecked={selectedCharacters.includes(record.id)}
            onChange={() => {
              dispatch(selectCharacters([record.id]))
            }}
          />
          <img
            src={record.image}
            alt={record.name}
            className="character-avatar"
          />
          <span>{id}</span>
        </div>
      ),
    },
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Location Origin',
      dataIndex: 'location',
      render: (_, record) => record.location?.name || 'Unknown',
    },
    {
      title: 'Favorites',
      dataIndex: 'favorites',
      key: 'favorites',
      render: (_, record) => (
        <div className="centered icon">
          {favorites.includes(record.id) ? (
            <StarTwoTone
              onClick={() => handleToggleFavorite(record.id)}
              twoToneColor="#FFD700"
            />
          ) : (
            <StarTwoTone
              onClick={() => handleToggleFavorite(record.id)}
              twoToneColor="#C4C4C4"
            />
          )}
        </div>
      ),
    },
    {
      title: 'Created date',
      dataIndex: 'created',
      key: 'created',
    },
  ]

  if (isLoading) {
    return (
      <div className="table-layout">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <Table<Character>
      rowKey="id"
      columns={columns}
      dataSource={characters?.results}
      pagination={{
        pageSize: 20,
        total: characters?.info?.count ?? 0,
        current: (() => {
          const next = characters?.info?.next
          const prev = characters?.info?.prev

          if (next) {
            const nextPageMatch = next.match(/[?&]page=(\d+)/)
            return nextPageMatch ? Math.max(1, Number(nextPageMatch[1]) - 1) : 1
          } else if (prev) {
            const prevPageMatch = prev.match(/[?&]page=(\d+)/)
            return prevPageMatch ? Number(prevPageMatch[1]) + 1 : 1
          }
          return 1
        })(),
        showSizeChanger: false,
        showQuickJumper: false,
        onChange: (page) => {
          dispatch(fetchCharacters(query, page))
        },
      }}
      components={{
        body: {
          row: (
            props: React.HTMLAttributes<HTMLTableRowElement> & {
              'data-row-key'?: string
            }
          ) => {
            const rowKey = props['data-row-key']
            const currentCharacter = characters?.results?.find(
              (c) => c.id === Number(rowKey)
            )

            const items: MenuProps['items'] = [
              {
                key: '1',
                icon:
                  currentCharacter &&
                  favorites.includes(currentCharacter.id) ? (
                    <StarTwoTone className="icon" twoToneColor="#FFD700" />
                  ) : (
                    <StarTwoTone className="icon" twoToneColor="#C4C4C4" />
                  ),
                label:
                  currentCharacter && favorites.includes(currentCharacter.id)
                    ? 'Remove from favorites'
                    : 'Add to favorites',
              },
              {
                key: '2',
                icon: <InfoCircleOutlined className="icon" />,
                label: 'Details',
                disabled: false,
              },
            ]

            return (
              <>
                <Dropdown
                  menu={{
                    items,
                    onClick: (menuInfo) => {
                      if (menuInfo.key === '1' && currentCharacter) {
                        handleToggleFavorite(currentCharacter.id)
                      }

                      if (menuInfo.key === '2' && currentCharacter) {
                        dispatch(selectCharacterDetails(currentCharacter.id))
                      }
                    },
                  }}
                  trigger={['contextMenu']}
                >
                  <tr {...props} />
                </Dropdown>
              </>
            )
          },
        },
      }}
    />
  )
}

export default CharactersTable
