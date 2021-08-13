import React from 'react'
import { BodyWrapper, MediumHeaderWrapper } from './AppBody'
import { useActiveProtocol } from '../state/governance/hooks'
import { RouteComponentProps } from 'react-router-dom'
import { useActiveWeb3React } from '../hooks'
import { OutlineCard } from '../components/Card'
import { useProtocolUpdate } from '../hooks/useProtocolUpdate'
import { AutoColumn } from '../components/Column'
import { RowFixed } from '../components/Row'
import { TYPE, Above1080Only, Below1080Only } from '../theme'
import { WrappedListLogo } from '../components/governance/styled'
import Tabs from '../components/governance/Tabs'
import Dropdown from '../components/governance/Dropdown'

export default function CreateProposal() {
  // if valid protocol id passed in, update global active protocol
  useProtocolUpdate('compound')

  const [activeProtocol] = useActiveProtocol()

  // if on testnet, show warning
  const { chainId } = useActiveWeb3React()

  return (
    <BodyWrapper>
      <AutoColumn gap="1rem">
        <MediumHeaderWrapper>
          <AutoColumn gap="sm">
            <Above1080Only>
              <RowFixed>
                <WrappedListLogo src={activeProtocol?.logo} />
                <TYPE.mediumHeader ml="8px" fontWeight={600} color={activeProtocol?.primaryColor}>
                  {activeProtocol?.name}
                </TYPE.mediumHeader>
              </RowFixed>
            </Above1080Only>
            <Below1080Only>
              <Dropdown />
            </Below1080Only>
            <Tabs />
          </AutoColumn>
        </MediumHeaderWrapper>
        {/* TODO: change later */}
        {chainId === 1 ? <div>Vote Here</div> : <OutlineCard>Please switch to Ethereum mainnet.</OutlineCard>}
      </AutoColumn>
    </BodyWrapper>
  )
}
