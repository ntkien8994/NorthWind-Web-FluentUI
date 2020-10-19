USE [master]
GO
/****** Object:  Database [NorthWind]    Script Date: 10/19/2020 10:11:13 PM ******/
CREATE DATABASE [NorthWind]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'NorthWind', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\NorthWind.mdf' , SIZE = 1187840KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'NorthWind_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\NorthWind_log.ldf' , SIZE = 7086080KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [NorthWind] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [NorthWind].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [NorthWind] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [NorthWind] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [NorthWind] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [NorthWind] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [NorthWind] SET ARITHABORT OFF 
GO
ALTER DATABASE [NorthWind] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [NorthWind] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [NorthWind] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [NorthWind] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [NorthWind] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [NorthWind] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [NorthWind] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [NorthWind] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [NorthWind] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [NorthWind] SET  DISABLE_BROKER 
GO
ALTER DATABASE [NorthWind] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [NorthWind] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [NorthWind] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [NorthWind] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [NorthWind] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [NorthWind] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [NorthWind] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [NorthWind] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [NorthWind] SET  MULTI_USER 
GO
ALTER DATABASE [NorthWind] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [NorthWind] SET DB_CHAINING OFF 
GO
ALTER DATABASE [NorthWind] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [NorthWind] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [NorthWind] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [NorthWind] SET QUERY_STORE = OFF
GO
USE [NorthWind]
GO
/****** Object:  Table [dbo].[Contract]    Script Date: 10/19/2020 10:11:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contract](
	[ContractId] [uniqueidentifier] NOT NULL,
	[ContractCode] [varchar](50) NOT NULL,
	[CustomerId] [uniqueidentifier] NULL,
	[ContractDate] [datetime] NOT NULL,
	[ContactType] [int] NULL,
	[ContactName] [nvarchar](250) NULL,
	[ContactTel] [nvarchar](50) NULL,
	[CompanyName] [nvarchar](250) NULL,
	[Tel] [varchar](50) NULL,
	[Fax] [varchar](50) NULL,
	[ContractAmount] [decimal](18, 4) NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [nvarchar](50) NULL,
 CONSTRAINT [PK_Contract] PRIMARY KEY CLUSTERED 
(
	[ContractId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ContractDetail]    Script Date: 10/19/2020 10:11:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContractDetail](
	[ContractDetailId] [uniqueidentifier] NOT NULL,
	[ContractId] [uniqueidentifier] NULL,
	[ProductId] [uniqueidentifier] NULL,
	[UnitPrice] [decimal](18, 4) NULL,
	[Quantity] [int] NULL,
	[Amount] [decimal](18, 4) NULL,
	[PromotionRate] [decimal](18, 4) NULL,
	[TotalAmount] [decimal](18, 4) NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [nvarchar](50) NULL,
 CONSTRAINT [PK_ContractDetail] PRIMARY KEY CLUSTERED 
(
	[ContractDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 10/19/2020 10:11:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[CustomerId] [uniqueidentifier] NOT NULL,
	[CustomerCode] [nvarchar](50) NULL,
	[CustomerName] [nvarchar](255) NULL,
	[Address] [nvarchar](255) NULL,
	[Phone] [nvarchar](50) NULL,
	[Age] [int] NULL,
	[Revenue] [decimal](18, 4) NULL,
	[Inactive] [bit] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [nvarchar](50) NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[CustomerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 10/19/2020 10:11:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[ProductId] [uniqueidentifier] NOT NULL,
	[ProductCode] [nvarchar](50) NOT NULL,
	[ProductName] [nvarchar](250) NOT NULL,
	[InputDate] [datetime] NULL,
	[UnitPrice] [decimal](18, 4) NULL,
	[ImageUrl] [nvarchar](250) NULL,
	[Description] [nvarchar](250) NULL,
	[CategoryId] [uniqueidentifier] NULL,
	[Inactive] [bit] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [nvarchar](50) NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ContractDetail]  WITH CHECK ADD  CONSTRAINT [FK_ContractDetail_Contract] FOREIGN KEY([ContractId])
REFERENCES [dbo].[Contract] ([ContractId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ContractDetail] CHECK CONSTRAINT [FK_ContractDetail_Contract]
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetContractDetail_ById]    Script Date: 10/19/2020 10:11:13 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ==========================================================
-- Author:		ntkien
-- Create date: 24.09.2020
-- Description:	Lấy danh sách chi tiết hợp đồng theo masterid
-- ==========================================================
CREATE PROCEDURE [dbo].[Proc_GetContractDetail_ById]
	-- Add the parameters for the stored procedure here
	@ContractId uniqueidentifier
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	select CD.*,P.ProductCode,P.ProductName from ContractDetail CD left join Product P on CD.ProductId = P.ProductId
	where CD.ContractId = @ContractId 

END
GO
USE [master]
GO
ALTER DATABASE [NorthWind] SET  READ_WRITE 
GO
