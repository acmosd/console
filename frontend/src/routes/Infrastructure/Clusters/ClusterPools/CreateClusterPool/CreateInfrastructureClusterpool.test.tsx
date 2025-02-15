/* Copyright Contributors to the Open Cluster Management project */
import { render } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { secretsState } from '../../../../../atoms'
import { clickByTestId } from '../../../../../lib/test-util'
import { NavigationPath } from '../../../../../NavigationPath'
import { ProviderConnectionApiVersion, ProviderConnectionKind, Secret } from '../../../../../resources'
import { CreateInfrastructureClusterpool } from './CreateIntrastructureClusterpool'

const providerConnectionAws: Secret = {
    apiVersion: ProviderConnectionApiVersion,
    kind: ProviderConnectionKind,
    metadata: {
        name: 'aws',
        namespace: 'default',
        labels: {
            'cluster.open-cluster-management.io/type': 'aws',
            'cluster.open-cluster-management.io/credentials': '',
        },
    },
}

describe('CreateInfrastructure clusterpool', () => {
    const Component = () => {
        return (
            <RecoilRoot
                initializeState={(snapshot) => {
                    snapshot.set(secretsState, [providerConnectionAws])
                }}
            >
                <MemoryRouter initialEntries={[NavigationPath.createClusterPoolInfrastructure]}>
                    <Route path={NavigationPath.createClusterPoolInfrastructure}>
                        <CreateInfrastructureClusterpool />
                    </Route>
                </MemoryRouter>
            </RecoilRoot>
        )
    }

    test('can select aws', async () => {
        render(<Component />)
        await clickByTestId('aws')
    })

    test('can select google', async () => {
        render(<Component />)
        await clickByTestId('google')
    })

    test('can select azure', async () => {
        render(<Component />)
        await clickByTestId('azure')
    })
})
