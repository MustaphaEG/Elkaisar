

$(document).ready(function () {
    Elkaisar.Config.Game = {
        type: Phaser.AUTO,
        width: 1500,
        height: 900,
        parent: "BattelReplayCanvas",
        scale: {
            mode: Phaser.Scale.NONE,
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 200}
            }
        },
        scene: [BattelReplayScene]
    };
    ElkaisarBR.Game = new Phaser.Game(Elkaisar.Config.Game);
    
    
});

