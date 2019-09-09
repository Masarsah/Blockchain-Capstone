var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            for(let i = 5;i<15;i++)
            {
                await this.contract.mint(accounts[i],i,"token");
            }

        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply, 10, "total supply should return 10");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(accounts[5]);
            assert.equal(balance, 1, "balance should return 1");
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(5, {from: account_one});
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Token URI incorrect");
        })

        it('should transfer token from one owner to another', async function () { 
            let tokenOwner = await this.contract.ownerOf(6);
            assert.equal(tokenOwner, accounts[6], "incorrect Owner");
            await this.contract.transferFrom(accounts[6],accounts[7],6, {from:accounts[6]}) 
            tokenOwner = await this.contract.ownerOf(7);
            assert.equal(tokenOwner, accounts[7], "incorrect Owner");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let errorCount = 0;
            try{
                await this.contract.mint(accounts[20],20,"token", {from:accounts[20]});
            }
            catch(err)
            {
                errorCount++;
            }
            assert.equal(errorCount, 1, "Expected revert");

  
        })

        it('should return contract owner', async function () { 
            let ContractOwner = await this.contract.getOwner();
            assert.equal(ContractOwner, account_one, "Incorrect Owner");

        })

    });
})

