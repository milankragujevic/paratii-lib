import { Paratii } from '../lib/paratii.js'
import { address, privateKey, address1 } from './utils.js'
import { assert } from 'chai'

describe('paratii.eth.events API: :', function () {
  let paratii
  before(async function () {
    paratii = await new Paratii({
      provider: 'http://localhost:8545',
      address: address,
      privateKey: privateKey
    })
    await paratii.eth.deployContracts()
    paratii.eth.web3.setProvider('ws://localhost:8546')
  })

  // it('subscription to Tranfer PTI events should work as expected', function (done) {
  //   let beneficiary = '0xDbC8232Bd8DEfCbc034a0303dd3f0Cf41d1a55Cf'
  //   let amount = paratii.eth.web3.utils.toWei('4', 'ether')
  //
  //   paratii.eth.events.addListener('TransferPTI', function (log) {
  //     const received = log.returnValues.value
  //     assert.equal(received, amount)
  //     done()
  //   })
  //
  //   paratii.eth.transfer(beneficiary, amount, 'PTI')
  // })
  //
  // it('subscription to Tranfer ETH events should work as expected', function (done) {
  //   let beneficiary = '0xDbC8232Bd8DEfCbc034a0303dd3f0Cf41d1a55Cf'
  //   let amount = paratii.eth.web3.utils.toWei('4', 'ether')
  //   let description = 'thanks for all the fish'
  //
  //   paratii.eth.events.addListener('TransferETH', function (log) {
  //     let to = log.returnValues.to
  //     let value = log.returnValues.value
  //     let desc = log.returnValues.description
  //     assert.equal(to, beneficiary)
  //     assert.equal(value, amount)
  //     assert.equal(desc, description)
  //     done()
  //   })
  //
  //   paratii.eth.transfer(beneficiary, amount, 'ETH', description)
  // })

  it('subscription to Create Video events should work as expected', function (done) {
    let creator = address1
    let price = 3 * 10 ** 18
    let ipfsHash = 'xyz'
    let ipfsData = 'zzz'
    let videoId = 'some-id'

    paratii.eth.events.addListener('CreateVideo', function (log) {
      const receivedVideoId = log.returnValues.videoId
      assert.equal(videoId, receivedVideoId)
      done()
    })

    paratii.eth.vids.create({
      id: videoId,
      price: price,
      owner: creator,
      ipfsHash: ipfsHash,
      ipfsData: ipfsData
    })
  })

  // it('subscription to Update Video events should work as expected', function (done) {
  //   let creator = address1
  //   let price = 3 * 10 ** 18
  //   let ipfsHash = 'xyz'
  //   let ipfsData = 'zzz'
  //   let videoId = 'some-id'
  //
  //   paratii.eth.events.addListener('UpdateVideo', function (log) {
  //     const receivedVideoId = log.returnValues.videoId
  //     assert.equal(videoId, receivedVideoId)
  //     done()
  //   })
  //
  //   paratii.eth.vids.update(videoId, {
  //     id: videoId,
  //     price: price,
  //     owner: creator,
  //     ipfsHash: ipfsHash,
  //     ipfsData: ipfsData
  //   })
  //
  // })

  // it('subscription to Remove Video events should work as expected', function (done) {
  //   let videoId = 'some-id'
  //
  //   paratii.eth.events.addListener('RemoveVideo', function (log) {
  //     const receivedVideoId = log.returnValues.videoId
  //     assert.equal(videoId, receivedVideoId)
  //     done()
  //   })
  //
  //   paratii.eth.vids.delete(videoId)
  // })
})
