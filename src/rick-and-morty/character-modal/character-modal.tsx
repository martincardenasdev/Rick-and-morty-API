import { Badge, Flex, Image, Modal, Tag } from 'antd'
import './character-modal.css'
import { useTypedSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { selectCharacterDetails } from '../../redux/actions'

function CharacterModal() {
  const dispatch = useDispatch()
  const onModal = useTypedSelector((state) => state.onModal)
  const characters = useTypedSelector((state) => state.characters)

  const character = characters?.results?.find((c) => c.id === onModal) || null

  const aliveTagColor = () => {
    switch (character?.status) {
      case 'Alive':
        return 'green'
      case 'Dead':
        return 'red'
      case 'unknown':
        return 'default'
      default:
        return 'blue'
    }
  }

  return (
    <Modal
      open={!!character}
      className="modal"
      footer={null}
      onCancel={() => {
        dispatch(selectCharacterDetails(null))
      }}
    >
      <Flex className="character-content">
        <Image src={character?.image} alt={character?.name} width={200} />
        <Flex vertical className="character-details">
          <h1>{character?.name}</h1>
          <Flex className="tags-container">
            <Tag color={aliveTagColor()}>{character?.status}</Tag>
            <Tag color="blue">{character?.origin.name}</Tag>
            <Tag color="blue">{character?.species}</Tag>
          </Flex>
          <Flex className="episodes-badge">
            <Badge color="blue" count={character?.episode.length} /> Episodes
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default CharacterModal
