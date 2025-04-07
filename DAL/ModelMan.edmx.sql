
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 04/07/2025 10:57:04
-- Generated from EDMX file: C:\Users\Admin\Documents\abd-manstyle\DAL\ModelMan.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [BDmanstyle];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK__Compra_En__ID_Pr__6B24EA82]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Compra_Entrada] DROP CONSTRAINT [FK__Compra_En__ID_Pr__6B24EA82];
GO
IF OBJECT_ID(N'[dbo].[FK__Producto__ID_Cat__66603565]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Producto] DROP CONSTRAINT [FK__Producto__ID_Cat__66603565];
GO
IF OBJECT_ID(N'[dbo].[FK__Producto__ID_Pro__68487DD7]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Producto] DROP CONSTRAINT [FK__Producto__ID_Pro__68487DD7];
GO
IF OBJECT_ID(N'[dbo].[FK__Producto__ID_Suc__6754599E]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Producto] DROP CONSTRAINT [FK__Producto__ID_Suc__6754599E];
GO
IF OBJECT_ID(N'[dbo].[FK__Vendedor__ID_Rol__5EBF139D]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Vendedor] DROP CONSTRAINT [FK__Vendedor__ID_Rol__5EBF139D];
GO
IF OBJECT_ID(N'[dbo].[FK__Vendedor__ID_Suc__5FB337D6]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Vendedor] DROP CONSTRAINT [FK__Vendedor__ID_Suc__5FB337D6];
GO
IF OBJECT_ID(N'[dbo].[FK__Venta_Det__ID_Pr__73BA3083]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Venta_Detalles] DROP CONSTRAINT [FK__Venta_Det__ID_Pr__73BA3083];
GO
IF OBJECT_ID(N'[dbo].[FK__Venta_Det__ID_Ve__74AE54BC]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Venta_Detalles] DROP CONSTRAINT [FK__Venta_Det__ID_Ve__74AE54BC];
GO
IF OBJECT_ID(N'[dbo].[FK__Venta_Fac__ID_Cl__6E01572D]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Venta_Factura] DROP CONSTRAINT [FK__Venta_Fac__ID_Cl__6E01572D];
GO
IF OBJECT_ID(N'[dbo].[FK__Venta_Fac__ID_Pr__6FE99F9F]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Venta_Factura] DROP CONSTRAINT [FK__Venta_Fac__ID_Pr__6FE99F9F];
GO
IF OBJECT_ID(N'[dbo].[FK__Venta_Fac__ID_Su__70DDC3D8]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Venta_Factura] DROP CONSTRAINT [FK__Venta_Fac__ID_Su__70DDC3D8];
GO
IF OBJECT_ID(N'[dbo].[FK__Venta_Fac__ID_Ve__6EF57B66]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Venta_Factura] DROP CONSTRAINT [FK__Venta_Fac__ID_Ve__6EF57B66];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Categoria]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Categoria];
GO
IF OBJECT_ID(N'[dbo].[Cliente]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Cliente];
GO
IF OBJECT_ID(N'[dbo].[Compra_Entrada]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Compra_Entrada];
GO
IF OBJECT_ID(N'[dbo].[Producto]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Producto];
GO
IF OBJECT_ID(N'[dbo].[Proveedor]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Proveedor];
GO
IF OBJECT_ID(N'[dbo].[Rol]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Rol];
GO
IF OBJECT_ID(N'[dbo].[Sucursal]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Sucursal];
GO
IF OBJECT_ID(N'[dbo].[Vendedor]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Vendedor];
GO
IF OBJECT_ID(N'[dbo].[Venta_Detalles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Venta_Detalles];
GO
IF OBJECT_ID(N'[dbo].[Venta_Factura]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Venta_Factura];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Categoria'
CREATE TABLE [dbo].[Categoria] (
    [ID_Categoria] int IDENTITY(1,1) NOT NULL,
    [Nombre] varchar(50)  NOT NULL,
    [Estado] int  NULL
);
GO

-- Creating table 'Cliente'
CREATE TABLE [dbo].[Cliente] (
    [ID_Cliente] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(100)  NOT NULL,
    [Estado] int  NULL
);
GO

-- Creating table 'Compra_Entrada'
CREATE TABLE [dbo].[Compra_Entrada] (
    [ID_Entrada] int IDENTITY(1,1) NOT NULL,
    [Estado] int  NULL,
    [ID_Producto] int  NULL,
    [Fecha_Compra] datetime  NULL,
    [Precio_Compra] decimal(18,0)  NULL,
    [CantidadCompra] int  NULL
);
GO

-- Creating table 'Producto'
CREATE TABLE [dbo].[Producto] (
    [ID_Producto] int IDENTITY(1,1) NOT NULL,
    [ID_Categoria] int  NULL,
    [ID_Proveedor] int  NULL,
    [Nombre] nvarchar(100)  NOT NULL,
    [Marca] nvarchar(50)  NULL,
    [Cantidad] int  NULL,
    [Precio_Compra] decimal(10,2)  NULL,
    [Precio_Producto] decimal(10,2)  NULL,
    [ID_Sucursal] int  NULL,
    [Detalles] varchar(200)  NULL,
    [Image_URL] varchar(500)  NULL,
    [Estado] int  NULL
);
GO

-- Creating table 'Proveedor'
CREATE TABLE [dbo].[Proveedor] (
    [ID_Proveedor] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(100)  NULL,
    [Numero] nvarchar(20)  NULL,
    [Direccion] nvarchar(150)  NULL,
    [Estado] int  NULL
);
GO

-- Creating table 'Rol'
CREATE TABLE [dbo].[Rol] (
    [ID_Rol] int  NOT NULL,
    [Puesto] varchar(40)  NULL
);
GO

-- Creating table 'Sucursal'
CREATE TABLE [dbo].[Sucursal] (
    [ID_Sucursal] int IDENTITY(1,1) NOT NULL,
    [Nombre] nvarchar(100)  NOT NULL,
    [Direccion] nvarchar(150)  NOT NULL,
    [Estado] int  NULL
);
GO

-- Creating table 'Vendedor'
CREATE TABLE [dbo].[Vendedor] (
    [ID_Vendedor] int IDENTITY(1,1) NOT NULL,
    [ID_Rol] int  NULL,
    [Nombre] varchar(100)  NOT NULL,
    [Cedula] nvarchar(20)  NULL,
    [Edad] datetime  NULL,
    [Usuario] nvarchar(50)  NULL,
    [contra] nvarchar(20)  NULL,
    [Email] nvarchar(100)  NULL,
    [ID_Sucursal] int  NULL,
    [Estado] int  NULL
);
GO

-- Creating table 'Venta_Detalles'
CREATE TABLE [dbo].[Venta_Detalles] (
    [ID_Detalles] int IDENTITY(1,1) NOT NULL,
    [ID_Producto] int  NULL,
    [ID_Venta] int  NULL,
    [Cantidad] int  NULL,
    [PrecioProducto] decimal(18,0)  NULL
);
GO

-- Creating table 'Venta_Factura'
CREATE TABLE [dbo].[Venta_Factura] (
    [ID_Venta] int IDENTITY(1,1) NOT NULL,
    [Estado] int  NULL,
    [ID_Producto] int  NULL,
    [ID_Cliente] int  NULL,
    [ID_Vendedor] int  NULL,
    [ID_Sucursal] int  NULL,
    [Fecha_Venta] datetime  NULL,
    [Cantidad] int  NULL,
    [Subtotal] decimal(10,2)  NULL,
    [Total] decimal(10,2)  NULL,
    [PrecioProducto] decimal(10,2)  NULL,
    [Paga] decimal(10,2)  NULL,
    [Cambio] decimal(10,2)  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [ID_Categoria] in table 'Categoria'
ALTER TABLE [dbo].[Categoria]
ADD CONSTRAINT [PK_Categoria]
    PRIMARY KEY CLUSTERED ([ID_Categoria] ASC);
GO

-- Creating primary key on [ID_Cliente] in table 'Cliente'
ALTER TABLE [dbo].[Cliente]
ADD CONSTRAINT [PK_Cliente]
    PRIMARY KEY CLUSTERED ([ID_Cliente] ASC);
GO

-- Creating primary key on [ID_Entrada] in table 'Compra_Entrada'
ALTER TABLE [dbo].[Compra_Entrada]
ADD CONSTRAINT [PK_Compra_Entrada]
    PRIMARY KEY CLUSTERED ([ID_Entrada] ASC);
GO

-- Creating primary key on [ID_Producto] in table 'Producto'
ALTER TABLE [dbo].[Producto]
ADD CONSTRAINT [PK_Producto]
    PRIMARY KEY CLUSTERED ([ID_Producto] ASC);
GO

-- Creating primary key on [ID_Proveedor] in table 'Proveedor'
ALTER TABLE [dbo].[Proveedor]
ADD CONSTRAINT [PK_Proveedor]
    PRIMARY KEY CLUSTERED ([ID_Proveedor] ASC);
GO

-- Creating primary key on [ID_Rol] in table 'Rol'
ALTER TABLE [dbo].[Rol]
ADD CONSTRAINT [PK_Rol]
    PRIMARY KEY CLUSTERED ([ID_Rol] ASC);
GO

-- Creating primary key on [ID_Sucursal] in table 'Sucursal'
ALTER TABLE [dbo].[Sucursal]
ADD CONSTRAINT [PK_Sucursal]
    PRIMARY KEY CLUSTERED ([ID_Sucursal] ASC);
GO

-- Creating primary key on [ID_Vendedor] in table 'Vendedor'
ALTER TABLE [dbo].[Vendedor]
ADD CONSTRAINT [PK_Vendedor]
    PRIMARY KEY CLUSTERED ([ID_Vendedor] ASC);
GO

-- Creating primary key on [ID_Detalles] in table 'Venta_Detalles'
ALTER TABLE [dbo].[Venta_Detalles]
ADD CONSTRAINT [PK_Venta_Detalles]
    PRIMARY KEY CLUSTERED ([ID_Detalles] ASC);
GO

-- Creating primary key on [ID_Venta] in table 'Venta_Factura'
ALTER TABLE [dbo].[Venta_Factura]
ADD CONSTRAINT [PK_Venta_Factura]
    PRIMARY KEY CLUSTERED ([ID_Venta] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [ID_Categoria] in table 'Producto'
ALTER TABLE [dbo].[Producto]
ADD CONSTRAINT [FK__Producto__ID_Cat__66603565]
    FOREIGN KEY ([ID_Categoria])
    REFERENCES [dbo].[Categoria]
        ([ID_Categoria])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Producto__ID_Cat__66603565'
CREATE INDEX [IX_FK__Producto__ID_Cat__66603565]
ON [dbo].[Producto]
    ([ID_Categoria]);
GO

-- Creating foreign key on [ID_Cliente] in table 'Venta_Factura'
ALTER TABLE [dbo].[Venta_Factura]
ADD CONSTRAINT [FK__Venta_Fac__ID_Cl__6E01572D]
    FOREIGN KEY ([ID_Cliente])
    REFERENCES [dbo].[Cliente]
        ([ID_Cliente])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Venta_Fac__ID_Cl__6E01572D'
CREATE INDEX [IX_FK__Venta_Fac__ID_Cl__6E01572D]
ON [dbo].[Venta_Factura]
    ([ID_Cliente]);
GO

-- Creating foreign key on [ID_Producto] in table 'Compra_Entrada'
ALTER TABLE [dbo].[Compra_Entrada]
ADD CONSTRAINT [FK__Compra_En__ID_Pr__6B24EA82]
    FOREIGN KEY ([ID_Producto])
    REFERENCES [dbo].[Producto]
        ([ID_Producto])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Compra_En__ID_Pr__6B24EA82'
CREATE INDEX [IX_FK__Compra_En__ID_Pr__6B24EA82]
ON [dbo].[Compra_Entrada]
    ([ID_Producto]);
GO

-- Creating foreign key on [ID_Proveedor] in table 'Producto'
ALTER TABLE [dbo].[Producto]
ADD CONSTRAINT [FK__Producto__ID_Pro__68487DD7]
    FOREIGN KEY ([ID_Proveedor])
    REFERENCES [dbo].[Proveedor]
        ([ID_Proveedor])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Producto__ID_Pro__68487DD7'
CREATE INDEX [IX_FK__Producto__ID_Pro__68487DD7]
ON [dbo].[Producto]
    ([ID_Proveedor]);
GO

-- Creating foreign key on [ID_Sucursal] in table 'Producto'
ALTER TABLE [dbo].[Producto]
ADD CONSTRAINT [FK__Producto__ID_Suc__6754599E]
    FOREIGN KEY ([ID_Sucursal])
    REFERENCES [dbo].[Sucursal]
        ([ID_Sucursal])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Producto__ID_Suc__6754599E'
CREATE INDEX [IX_FK__Producto__ID_Suc__6754599E]
ON [dbo].[Producto]
    ([ID_Sucursal]);
GO

-- Creating foreign key on [ID_Producto] in table 'Venta_Detalles'
ALTER TABLE [dbo].[Venta_Detalles]
ADD CONSTRAINT [FK__Venta_Det__ID_Pr__73BA3083]
    FOREIGN KEY ([ID_Producto])
    REFERENCES [dbo].[Producto]
        ([ID_Producto])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Venta_Det__ID_Pr__73BA3083'
CREATE INDEX [IX_FK__Venta_Det__ID_Pr__73BA3083]
ON [dbo].[Venta_Detalles]
    ([ID_Producto]);
GO

-- Creating foreign key on [ID_Producto] in table 'Venta_Factura'
ALTER TABLE [dbo].[Venta_Factura]
ADD CONSTRAINT [FK__Venta_Fac__ID_Pr__6FE99F9F]
    FOREIGN KEY ([ID_Producto])
    REFERENCES [dbo].[Producto]
        ([ID_Producto])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Venta_Fac__ID_Pr__6FE99F9F'
CREATE INDEX [IX_FK__Venta_Fac__ID_Pr__6FE99F9F]
ON [dbo].[Venta_Factura]
    ([ID_Producto]);
GO

-- Creating foreign key on [ID_Rol] in table 'Vendedor'
ALTER TABLE [dbo].[Vendedor]
ADD CONSTRAINT [FK__Vendedor__ID_Rol__5EBF139D]
    FOREIGN KEY ([ID_Rol])
    REFERENCES [dbo].[Rol]
        ([ID_Rol])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Vendedor__ID_Rol__5EBF139D'
CREATE INDEX [IX_FK__Vendedor__ID_Rol__5EBF139D]
ON [dbo].[Vendedor]
    ([ID_Rol]);
GO

-- Creating foreign key on [ID_Sucursal] in table 'Vendedor'
ALTER TABLE [dbo].[Vendedor]
ADD CONSTRAINT [FK__Vendedor__ID_Suc__5FB337D6]
    FOREIGN KEY ([ID_Sucursal])
    REFERENCES [dbo].[Sucursal]
        ([ID_Sucursal])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Vendedor__ID_Suc__5FB337D6'
CREATE INDEX [IX_FK__Vendedor__ID_Suc__5FB337D6]
ON [dbo].[Vendedor]
    ([ID_Sucursal]);
GO

-- Creating foreign key on [ID_Sucursal] in table 'Venta_Factura'
ALTER TABLE [dbo].[Venta_Factura]
ADD CONSTRAINT [FK__Venta_Fac__ID_Su__70DDC3D8]
    FOREIGN KEY ([ID_Sucursal])
    REFERENCES [dbo].[Sucursal]
        ([ID_Sucursal])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Venta_Fac__ID_Su__70DDC3D8'
CREATE INDEX [IX_FK__Venta_Fac__ID_Su__70DDC3D8]
ON [dbo].[Venta_Factura]
    ([ID_Sucursal]);
GO

-- Creating foreign key on [ID_Vendedor] in table 'Venta_Factura'
ALTER TABLE [dbo].[Venta_Factura]
ADD CONSTRAINT [FK__Venta_Fac__ID_Ve__6EF57B66]
    FOREIGN KEY ([ID_Vendedor])
    REFERENCES [dbo].[Vendedor]
        ([ID_Vendedor])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Venta_Fac__ID_Ve__6EF57B66'
CREATE INDEX [IX_FK__Venta_Fac__ID_Ve__6EF57B66]
ON [dbo].[Venta_Factura]
    ([ID_Vendedor]);
GO

-- Creating foreign key on [ID_Venta] in table 'Venta_Detalles'
ALTER TABLE [dbo].[Venta_Detalles]
ADD CONSTRAINT [FK__Venta_Det__ID_Ve__74AE54BC]
    FOREIGN KEY ([ID_Venta])
    REFERENCES [dbo].[Venta_Factura]
        ([ID_Venta])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK__Venta_Det__ID_Ve__74AE54BC'
CREATE INDEX [IX_FK__Venta_Det__ID_Ve__74AE54BC]
ON [dbo].[Venta_Detalles]
    ([ID_Venta]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------