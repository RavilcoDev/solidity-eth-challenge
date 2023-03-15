const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PokemonsFactory", function () {
  async function deployPokemonFactory() {
    const PokemonFactory = await ethers.getContractFactory("PokemonFactory")
    const pokemonFactory = await PokemonFactory.deploy()
    return { pokemonFactory }
  }

  describe("Deploy", async function () {
    it("Should deploy with Pokemons empty", async function () {
      const { pokemonFactory } = await loadFixture(deployPokemonFactory)
      const pokemons = await pokemonFactory.getAllPokemons()

      expect(Array.isArray(pokemons)).to.be.true;
      expect(pokemons.length).to.equal(0);
    })
  })

  describe("Events", async function () {
    it("Should emit an event eventNewPokemon", async function () {
      const { pokemonFactory } = await loadFixture(deployPokemonFactory)

      await expect(pokemonFactory.createPokemon(1, "bullbasaur"))
        .to.emit(pokemonFactory, "eventNewPokemon")
        .withArgs(1, "bullbasaur")
    })
  })

  describe("Require", async function () {
    it("Should validate reverted _id == 0", async function () {
      const { pokemonFactory } = await loadFixture(deployPokemonFactory)

      await expect(pokemonFactory.createPokemon(0, "bullbasaur"))
        .to.be.reverted
    })
  })
})
