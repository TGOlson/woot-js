module Data.Woot.CoreSpec where


import Test.Hspec

import SpecHelper
import MockData

import Data.Woot.Core


spec :: Spec
spec = do
    describe "integrate" $ do
        it "should integrate an operation into the string if given a valid op" $ do
            integrate validInsertOp mockWString `shouldShowJust` "baqr"
            integrate validInsertOpAmbiguous mockWString `shouldShowJust` "barW"
            integrate validDeleteOp mockWString `shouldShowJust` "ar"

        it "should not integrate an operation if given an invalid op" $ do
            integrate invalidInsertOp mockWString `shouldBe` Nothing
            integrate invalidDeleteOp mockWString `shouldBe` Nothing

        it "should accept multiple inserts of the same char with no affect" $ do
            let (Just newString) = integrate validInsertOp mockWString
            integrate validInsertOp newString `shouldShowJust` "baqr"

        it "should accept multiple deletes of the same char with no affect" $ do
            let (Just newString) = integrate validDeleteOp mockWString
            integrate validDeleteOp newString `shouldShowJust` "ar"

    describe "integrateAll" $ do
        it "should integrate a list of valid operations" $ do
            let (ops, wString) = integrateAll [validInsertOp, validDeleteOp] mockWString
            ops `shouldBe` []
            show wString `shouldBe` "aqr"

        it "should return any invalid operations" $ do
            let (ops, wString) = integrateAll [invalidInsertOp, invalidDeleteOp] mockWString
            ops `shouldBe` [invalidInsertOp, invalidDeleteOp]
            show wString `shouldBe` "bar"

        it "should recurse if an operation is made valid by a later operation" $ do
            let (ops, wString) = integrateAll [invalidInsertOp, invalidDeleteOp, validInsertToValidateDelete] mockWString
            ops `shouldBe` [invalidInsertOp]
            show wString `shouldBe` "bar"
